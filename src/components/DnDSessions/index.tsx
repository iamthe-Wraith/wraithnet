import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { ThemeContext } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { NoteModel } from '../../models/notes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { NoteEditor } from '../NoteEditor';
import { SessionListItem } from './SessionListItem';

import { DnDSessionNoteContainer, DnDSessionsContainer, DnDSessionsListContainer } from './styles';

interface IProps {
    className?: string;
}

const DnDSessionsBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);
    const [selectedSession, setSelectedSession] = useState<NoteModel>(null);

    const loadMore = () => {
        dnd.campaign.sessions.loadMore()
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (!dnd.campaign.sessions.firstPageLoaded) loadMore();
    }, []);
    
    const onAddSessionClick = () => {
        dnd.campaign.createSession()
            .then(() => {
                // automatically select new session
                setSelectedSession(dnd.campaign.sessions.results[0]);
            })
            .catch(err => {
                console.log('error creating session');
                console.error(err);
            });
    }

    const onCancelNoteChange = (origNote: NoteModel, _: NoteModel) => {
        setSelectedSession(origNote);
    }

    const onSessionClick = (session: NoteModel) => () => {
        session.load()
            .catch(err => {
                console.log('error loading session note');
                console.error(err);
            });

        setSelectedSession(session);
    }

    const renderSessionsList = () => {
        const loadingSpinner = (
            <div key='sessions-spinner' className='sessions-spinner-container'>
                <LoadingSpinner
                    className='sessions-spinner'
                    type={SpinnerType.Random}
                    size={ SpinnerSize.Tiny }
                />
            </div>
        );

        let list: JSX.Element[] = [];
        
        if (dnd.campaign.creatingSession) list.push(loadingSpinner);

        const sessions = dnd.campaign.sessions.results.map(session => (
            <SessionListItem
                key={ session.id }
                onClick={ onSessionClick(session) }
                selected={ selectedSession?.id === session.id }
                session={ session }
            />
        ));

        list = [...list, ...sessions];

        if (dnd.campaign.sessions.busy) list.push(loadingSpinner)

        if (!dnd.campaign.sessions.allResultsFetched && !dnd.campaign.sessions.busy) {
            return [...list, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
        }

        return sessions;
    }

    return (
        <DnDSessionsContainer className={ className }>
            <DnDSessionsListContainer>
                <div className='header'>Sessions</div>
                <div className='sessions-list'>
                    { renderSessionsList() }
                </div>
                <div className='footer'>
                    <Button
                        buttonType={ ButtonType.Blank }
                        onClick={ onAddSessionClick }
                    >
                        + add session
                    </Button>
                </div>
                <Right2 />
            </DnDSessionsListContainer>
            <DnDSessionNoteContainer>
                {
                    selectedSession?.busy && (
                        <LoadingSpinner
                            type={SpinnerType.Random}
                            size={ SpinnerSize.Small }
                        />
                    )
                }
                {
                    !!selectedSession && (
                        <NoteEditor
                            className='session-editor'
                            note={ selectedSession }
                            onCancelNoteChange={ onCancelNoteChange }
                        />
                    )
                }
            </DnDSessionNoteContainer>
        </DnDSessionsContainer>
    );
};

export const DnDSessions = observer(DnDSessionsBase);

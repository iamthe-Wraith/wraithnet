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
        const sessions = dnd.campaign.sessions.results.map(session => (
            <SessionListItem
                key={ session.id }
                onClick={ onSessionClick(session) }
                selected={ selectedSession?.id === session.id }
                session={ session }
            />
        ));

        if (dnd.campaign.sessions.busy) {
            sessions.push((
                <div key='sessions-spinner' className='sessions-spinner-container'>
                    <LoadingSpinner
                        className='sessions-spinner'
                        type={SpinnerType.Random}
                        size={ SpinnerSize.Tiny }
                    />
                </div>
            ))
        }

        if (!dnd.campaign.sessions.allResultsFetched && !dnd.campaign.sessions.busy) {
            return [...sessions, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
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

import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { ThemeContext } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { NoteModel } from '../../models/notes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { CTAs } from '../CtasContainer';
import { Right2 } from '../decorators/right/Right2';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';
import { NoteEditor } from '../NoteEditor';
import { TextInput } from '../TextInput';
import { SessionListItem } from './SessionListItem';

import { DnDSessionNoteContainer, DnDSessionsContainer, DnDSessionsListContainer, NewSessionModal } from './styles';

interface IProps {
    className?: string;
}

const DnDSessionsBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);
    const [selectedSession, setSelectedSession] = useState<NoteModel>(null);
    const [showNewSessionModal, setShowNewSessionModal] = useState(false);
    const [newSessionName, setNewSessionName] = useState('');

    const loadMore = () => {
        dnd.campaign.sessions.loadMore()
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        if (!dnd.campaign.sessions.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (!showNewSessionModal) setNewSessionName('');
    }, [showNewSessionModal]);

    const onCancelNoteChange = (origNote: NoteModel, _: NoteModel) => {
        setSelectedSession(origNote);
    }

    const onCreateSessionClick = () => {
        dnd.campaign.createSession(newSessionName)
            .then(() => {
                // automatically select new session
                setShowNewSessionModal(false);
                setSelectedSession(dnd.campaign.sessions.results[0]);
                setNewSessionName('');
            })
            .catch(err => {
                console.log('error creating session');
                console.error(err);
            });
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
        let list: JSX.Element[] = [];

        if (dnd.campaign.sessions.results.length > 0) {
            const sessions = dnd.campaign.sessions.results.map(session => (
                <SessionListItem
                    key={ session.id }
                    onClick={ onSessionClick(session) }
                    selected={ selectedSession?.id === session.id }
                    session={ session }
                />
            ));
    
            list = [...list, ...sessions];
        } else {
            list.push(<div key='no-sessions' className='no-sessions'>no sessions</div>)
        }

        if (dnd.campaign.sessions.busy) {
            list.push((
                <div key='sessions-spinner' className='sessions-spinner-container'>
                    <LoadingSpinner
                        className='sessions-spinner'
                        type={SpinnerType.Random}
                        size={ SpinnerSize.Tiny }
                    />
                </div>
            ));
        }

        if (!dnd.campaign.sessions.allResultsFetched && !dnd.campaign.sessions.busy) {
            return [...list, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
        }

        return list;
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
                        onClick={() => setShowNewSessionModal(true)}
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
            <Modal
                header='New Session'
                onClose={() => setShowNewSessionModal(false)}
                isOpen={ showNewSessionModal }
                size={ ModalSize.Small }
            >
                <NewSessionModal>
                    <div className='label'>session name</div>
                    <TextInput
                        inputId='new-session-name-input'
                        onChange={e => setNewSessionName(e.target.value)}
                        value={ newSessionName }
                    />
                    <CTAs
                        ctas={[
                            {
                                disabled: !newSessionName,
                                text: 'create',
                                type: ButtonType.Primary,
                                onClick: onCreateSessionClick,
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.Blank,
                                onClick: () => setShowNewSessionModal(false),
                            }
                        ]}
                    />
                    { dnd.campaign.busy && <LoadingSpinner size={ SpinnerSize.Tiny } />}
                </NewSessionModal>
            </Modal>
        </DnDSessionsContainer>
    );
};

export const DnDSessions = observer(DnDSessionsBase);

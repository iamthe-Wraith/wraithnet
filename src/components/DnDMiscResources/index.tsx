import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { DnDContext } from '../../contexts/DnD';
import { UserContext } from '../../contexts/User';
import { NoteModel } from '../../models/notes';
import { UserRole } from '../../models/user';
import { Button, ButtonType } from '../Button';
import { Left1 } from '../decorators/left/Left1';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal } from '../Modal';
import { NoteEditor } from '../NoteEditor';
import { DnDMiscResource } from './DnDMiscResource';

import { DnDMiscResourcesContainer, NoteEditorContainer } from './styles';

interface IProps {
    className?: string;
}

const defaultMiscNote = {
    name: 'Untitled Misc Note',
    category: 'dnd_misc_resource',
    access: ['all'],
};

const DnDMiscResourcesBase: React.FC<IProps> = ({ className = '' }) => {
    const user = useContext(UserContext);
    const dnd = useContext(DnDContext);
    const [selectedResource, setSelectedResource] = useState<NoteModel>(null);
    const [showResourceModal, setShowResourceModal] = useState(false);

    const loadMore = () => {
        dnd.misc.loadMore()
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (!dnd.misc.firstPageLoaded) loadMore();
    }, []);

    useEffect(() => {
        if (selectedResource) {
            // only try to load if selectedResource has an id
            // if it doesnt is a new note, and will not have
            // anything to load
            if (!!selectedResource?.id) {
                selectedResource.load()
                    .then(() => {
                        setShowResourceModal(true);
                    })
                    .catch(err => {
                        console.log('error loading misc resource');
                        console.log(err);
                    });
            } else {
                setShowResourceModal(true);
            }
        }
    }, [selectedResource]);

    const onAddNewClick = () => {
        setSelectedResource(new NoteModel(defaultMiscNote));
    };

    const onResourceClick = (resource: NoteModel) => {
        setSelectedResource(resource);
    };

    const onResourceClose = () => {
        if (!!selectedResource.id && !dnd.misc.results.find(r => r.id === selectedResource.id)) {
            // is a new note that has just been saved
            dnd.misc.refresh()
                .catch(err => {
                    console.error(err);
                });
        }
        
        setShowResourceModal(false);
        setSelectedResource(null);
    };

    const renderMiscResources = () => {
        let resources: JSX.Element[] = dnd.misc.results.map(resource => {            
            return (
                <DnDMiscResource
                    key={ resource.id }
                    className={ `dnd-misc-resource` }
                    id={ resource.id }
                    onClick={ onResourceClick }
                    resource={ resource }
                    selected={ selectedResource?.id === resource.id }
                >
                    <div className='misc-resource-name'>{ resource.name }</div>
                </DnDMiscResource>
            );
        });

        if (dnd.misc.busy) {
            resources = [
                ...resources,
                (
                    <LoadingSpinner
                        key='loading-spinner'
                        className='spinner'
                        size={ SpinnerSize.Medium }
                        type={ SpinnerType.Random }
                    />
                ),
            ];
        }

        if (!dnd.misc.allResultsFetched && !dnd.misc.busy) {
            return [...resources, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 200 } />];
        }

        return resources;
    };

    return (
        <DnDMiscResourcesContainer className={ className }>
            <div className='misc-resources-wrapper'>
                <Left1 />
                <div className='header'>Resources</div>
                <div className='dnd-misc-resources'>
                    { renderMiscResources() }
                </div>
                <div className='footer'>
                    {
                        user.role !== UserRole.MEMBER && (
                            <Button
                                buttonType={ ButtonType.Blank }
                                onClick={ onAddNewClick }
                            >
                                + add new
                            </Button>
                        )
                    }
                </div>
            </div>
            <Modal
                header={ <div className='misc-note-modal-header'>{ selectedResource?.name }</div> }
                isOpen={ showResourceModal }
                onClose={ onResourceClose }
            >
                <NoteEditorContainer>
                    <NoteEditor
                        className='note-editor'
                        note={ selectedResource }
                        readonly={ user.role === UserRole.MEMBER }
                    />
                </NoteEditorContainer>
            </Modal>
        </DnDMiscResourcesContainer>
    );
};

export const DnDMiscResources = observer(DnDMiscResourcesBase);

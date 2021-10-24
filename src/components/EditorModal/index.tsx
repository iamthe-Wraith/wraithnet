import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { NoteModel } from '../../models/notes';
import { UserRole } from '../../models/user';
import { Editor } from '../Editor';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';

import { Container } from './styles';

interface IProps {
    className?: string;
    isOpen?: boolean;
    readonly?: boolean;
    resource?: NoteModel;
    onClose:() => void;
}

const EditorModalBase: React.FC<IProps> = ({
    className = '',
    isOpen,
    readonly,
    resource,
    onClose,
}) => {
    useEffect(() => {
        if (resource) {
            resource.load()
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    const onEditorClose = () => {
        onClose();
    }

    const renderSelectedResource = () => {
        if (resource?.busy) {
            return (
                <LoadingSpinner
                    className='spinner'
                    size={ SpinnerSize.Medium }
                    type={ SpinnerType.Random }
                />
            )
        }

        return (
            <Editor
                readonly={ readonly }
                className='editor'
                resource={ resource }
                onEditClose={ onEditorClose }
            />
        )
    }

    return (
        <Modal
            header='Editor'
            isOpen={ isOpen }
            onClose={ onClose }
            size={ ModalSize.Large }
        >
            { renderSelectedResource() }
        </Modal>
    );
}

export const EditorModal = observer(EditorModalBase);

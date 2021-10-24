import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserContext } from '../../contexts/User';
import { INote, INoteRef, NoteModel } from '../../models/notes';
import { UserRole } from '../../models/user';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { EditIcon } from '../svgs/icons/EditIcon';
import { TextArea } from '../TextArea';
import { TextInput } from '../TextInput';

import { Body, Header, NoteEditorContainer } from './styles';

interface IProps {
    className?: string;
    note: NoteModel;
    readonly?: boolean;
    onSave?: () => void;
}

const NoteEditorBase: React.FC<IProps> = ({
    className = '',
    note,
    readonly,
    onSave,
}) => {
    const user = useContext(UserContext);
    const [editMode, setEditMode] = useState(!note?.id);
    const [name, setName] = useState(note?.name || 'Untitled Note');
    const [content, setContent] = useState(note?.text || '');
    const [category, setCategory] = useState(note?.category || 'no_category');
    const [shareWithAllUsers, setShareWithAllUsers] = useState(!!note?.access?.find(a => a === 'all'));
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (readonly) return;
        
        if (editMode) {            
            window.setTimeout(() => {
                textareaRef.current.focus();
                // TODO: set cursor to end of file...
            }, 10);
        }
    }, [editMode]);

    const onCancelClick = () => {
        setName(note?.name || '');
        setContent(note?.text || '');
        setCategory(note?.category || '')
        setEditMode(false);
    }

    const onSaveClick = () => {
        const data: Partial<INote> = {
            name,
            category,
            text: content,
        };

        if (user.role !== UserRole.MEMBER) {
            data.access = shareWithAllUsers ? ['all'] : [];
        }

        note.save(data)
            .then(() => {
                setEditMode(false);
                onSave?.();
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <NoteEditorContainer className={ className }>
            <Header>
                <div className='name'>
                    {
                        editMode && !readonly
                            ? (
                                <TextInput
                                    inputId='note-name'
                                    onChange={e => setName(e.target.value)}
                                    value={ name }
                                />
                            )
                            : <span>{ name }</span>
                    }
                </div>
                <div className='ctas-container'>
                    {
                        !editMode && !readonly
                            ? (
                                <Button
                                    buttonType={ ButtonType.Blank }
                                    className='edit-button'
                                    onClick={() => setEditMode(true)}
                                >
                                    <EditIcon />
                                    <span>Edit</span>
                                </Button>
                            )
                            : (
                                <>
                                    <Button
                                        buttonType={ ButtonType.Primary }
                                        className='save-button'
                                        disabled={ !name && !content }
                                        onClick={ onSaveClick }
                                    >
                                        <span>Save</span>
                                    </Button>
                                    <Button
                                        buttonType={ ButtonType.Blank }
                                        className='cancel-button'
                                        onClick={ onCancelClick }
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                </>
                            )
                    }
                </div>
            </Header>
            <Body>
                <div className='main-col'>
                    {
                        editMode && !readonly
                            ? (
                                <TextArea
                                    className='note-editor-textarea'
                                    textareaId='note-editor-textarea'
                                    textareaRef={ref => textareaRef.current = ref}
                                    onChange={e => setContent(e.target.value)}
                                    value={ content }
                                />
                            )
                            : (
                                <div className='markdown-container'>
                                    <ReactMarkdown
                                        children={ content }
                                    />
                                </div>
                            )
                    }
                </div>
                <div className='right-col'>
                    <div className='property-container'>
                        <div className='header'>category</div>
                        {
                            editMode && !readonly
                                ? (
                                    <TextInput
                                        className='note-editor-input'
                                        inputId='note-editor-category-input'
                                        onChange={e => setCategory(e.target.value)}
                                        value={ category }
                                    />
                                )
                                : (
                                    <div>
                                        { category }
                                    </div>
                                )
                        }
                    </div>
                    {
                        user.role !== UserRole.MEMBER && (
                            <div className='property-container'>
                                <div className='header'>access</div>
                                <div>
                                    {
                                        editMode && !readonly
                                            ? (
                                                <Checkbox
                                                    checked={ shareWithAllUsers }
                                                    id='access-checkbox'
                                                    label={ <span>share with all users</span> }
                                                    onChange={e => setShareWithAllUsers(e.target.checked)}
                                                />
                                            )
                                            : (
                                                <div>
                                                    { shareWithAllUsers ? 'all users' : 'just you' }
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </Body>
        </NoteEditorContainer>
    );
}

export const NoteEditor = observer(NoteEditorBase);

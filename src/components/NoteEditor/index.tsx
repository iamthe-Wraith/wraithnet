import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkInlineLinks from 'remark-inline-links';
import { UserContext } from '../../contexts/User';
import { INote, NoteModel } from '../../models/notes';
import { UserRole } from '../../models/user';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { EditIcon } from '../svgs/icons/EditIcon';
import { TextArea } from '../TextArea';
import { TextInput } from '../TextInput';

import { HeadingsComponent } from './components/HeadingsComponent';
import { Body, Header, NoteEditorContainer } from './styles';
import { RefComponent } from './components/RefComponent';
import { ParagraphComponent } from './components/ParagraphComponent';
import { Markdown } from '../Markdown';
import { Modal, ModalSize } from '../Modal';
import { CTAs } from '../CtasContainer';
import { TagsList } from '../TagsList';
import { Tag, TagType } from '../Tag';
import { TagModel } from '../../models/tags';
import { BaseNoteEditor } from '../BaseNoteEditor';

interface IProps {
    className?: string;
    note?: NoteModel;
    readonly?: boolean;
    onSave?: () => void;
    onCancelNoteChange?:(originalNote: NoteModel, newNote: NoteModel) => void;
}

const NoteEditorBase: React.FC<IProps> = ({
    className = '',
    note,
    readonly,
    onSave,
    onCancelNoteChange
}) => {
    const user = useContext(UserContext);
    const [_note, setNote] = useState(note);
    const [editMode, setEditMode] = useState(!_note?.id);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [shareWithAllUsers, setShareWithAllUsers] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setName(_note?.name || 'Untitled Note');
        setContent(_note?.text || '');
        setCategory(_note?.category || 'no_category');
        setShareWithAllUsers(!!_note?.access?.find(a => a === 'all'));
    }, [_note]);

    useEffect(() => {
        setContent(note?.text || '');
    }, [note?.text]);

    useEffect(() => {        
        if (note?.id !== _note?.id) {
            if (editMode) {
                setShowConfirmation(true);
            } else {
               setNote(note); 
            }
        }
    }, [note]);

    useEffect(() => {
        if (readonly) {
            return;
        };
        
        if (editMode) {            
            window.setTimeout(() => {
                textareaRef.current?.focus();
                const endIndex = textareaRef.current.value.length;
                textareaRef.current.setSelectionRange(endIndex, endIndex);
                textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
            }, 10);
        } else {
            const refs = document.querySelectorAll('.markdown-container ref');
        }
    }, [editMode]);

    const onCancelClick = () => {
        setName(_note?.name || '');
        setContent(_note?.text || '');
        setCategory(_note?.category || '')
        setEditMode(false);
    }

    const onCancelConfirmation = () =>  {
        setShowConfirmation(false);
        onCancelNoteChange?.(_note, note);
    }

    const onContinueWithoutSavingClick = () => {
        console.log('continuing without saving...');
    }

    const onSelectedTagsChange = (selectedTags: TagModel[]) => {
        setSelectedTags(selectedTags);
    }

    const onSaveAndContinueClick = () => {
        console.log('saving and continuing...');
    }

    const onSaveClick = () => {
        const data: Partial<INote> = {
            name,
            category,
            text: content,
            tags: selectedTags,
        };

        if (user.role !== UserRole.MEMBER) {
            data.access = shareWithAllUsers ? ['all'] : [];
        }

        _note.save(data)
            .then(() => {
                setEditMode(false);
                onSave?.();

                if (note.id !== _note.id) {
                    // a new note has been selected and these saved changes
                    // were a final save before opening that new note...now
                    // need to switch to the new note.
                    setNote(note);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const renderSelectedTags = (tags: TagModel[]) => {
        if (tags.length === 0) return <div className='no-tags'>no selected tags</div>;

        return tags.map(tag => (
            <Tag
                key={ tag.id }
                allowHoverHighlight={ false }
                className='selected-tag'
                isHighlighted={ true }
                text={ tag.text }
                type={ TagType.Secondary }
            />
        ));
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
                <BaseNoteEditor
                    className='main-col'
                    content={ content }
                    editMode={ editMode && !readonly }
                    id='note-editor-textarea'
                    noteRef={ref => textareaRef.current = ref}
                    onChange={c => setContent(c)}
                />
                <div className='note-right-col'>
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
                    <div className='property-container tags-container'>
                        <div className='header'>tags</div>
                        {
                            editMode
                                ? (
                                    <>
                                        <div className='selected-tags-container'>
                                            { renderSelectedTags(selectedTags) }
                                        </div>
                                        <TagsList
                                            className='tags-list'
                                            defaultSelectedTags={ note.tags }
                                            onSelectedTagsChange={ onSelectedTagsChange }
                                        />
                                    </>
                                )
                                : renderSelectedTags(note.tags)
                        }
                    </div>
                </div>
            </Body>
            <Modal
                isOpen={ showConfirmation }
                header='Hang on...'
                onClose={ onCancelConfirmation }
                size={ ModalSize.Medium }
            >
                <div className='confirmation-modal'>
                    <div>you're currently in edit mode...if you continue, any unsaved changes may be lost...</div>
                    <CTAs
                        ctas={ [
                            {
                                text: 'save and continue',
                                type: ButtonType.Primary,
                                onClick: onSaveAndContinueClick,
                            },
                            {
                                text: 'continue without saving',
                                type: ButtonType.PrimaryReverse,
                                onClick: onContinueWithoutSavingClick,
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.PrimaryReverse,
                                onClick: onCancelConfirmation,
                            }
                        ] }
                    />
                </div>
            </Modal>
        </NoteEditorContainer>
    );
}

export const NoteEditor = observer(NoteEditorBase);

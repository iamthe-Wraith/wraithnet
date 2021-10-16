import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { TextArea } from '../TextArea';

import { EditorContainer } from './styles';

interface IProps {
    className?: string;
    content?: string;
}

// TODO: add creating file/content/doc

// TODO: add deleting file/content/doc

// TODO: add editing/updating file/content/doc

// TODO: add setting file/content title at top of page
// - default to "untitled" (or something) so can tell there is something there
// - have edit button on hover and click to change
// - allow save in edit mode to save the content title
// - title is required in order to save...this is what will be keyed off of later to retrieve

// TODO: add ability to search content (ctrl+f)
// - should work in both edit and non-edit mode

// TODO: figure out how to replace <a> tags with popovers so can show relevant content in popover instead of having to click and go to another page

export const Editor: React.FC<IProps> = ({
    className = '',
    content = '',
}) => {
    const [_content, setContent] = useState(content);
    const [editMode, setEditMode] = useState(!content);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editMode) {
            console.log('setting focus');
            
            window.setTimeout(() => {
                textareaRef.current.focus();
                // TODO: set cursor to end of file...
            }, 10);
        }
    }, [editMode]);

    const setEditorHotkeys = (e: KeyboardEvent) => {
        if (e.key === 'e' && e.ctrlKey) {
            // enter/leave edit mode
			e.stopPropagation();
			e.preventDefault();
            const updatedEditMode = !editMode;
			setEditMode(updatedEditMode);
            // TODO: on leaving editor, trigger save
		}
    }

    useEffect(() => {
        window.removeEventListener('keydown', setEditorHotkeys);
		window.addEventListener('keydown', setEditorHotkeys);
		return () => {
			window.removeEventListener('keydown', setEditorHotkeys);
		};
    }, [editMode]);

    const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const renderEditor = () => {
        return (
            <div className='editor-container'>
                <TextArea
                    className='editor-textarea'
                    textareaId='editor-textarea'
                    textareaRef={ref => textareaRef.current = ref}
                    onChange={ onContentChange }
                    value={ _content }
                />
            </div>
        );
    };

    const renderMarkdown = () => {
        return (
            <div className='markdown-container'>
                <ReactMarkdown
                    children={ _content }
                />
            </div>
        );
    };

    return (
        <EditorContainer className={ className }>
            {
                editMode
                    ? renderEditor()
                    : renderMarkdown()
            }
        </EditorContainer>
    );
}

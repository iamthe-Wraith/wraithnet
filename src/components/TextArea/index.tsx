import React, { FocusEvent, useState } from 'react';
import { TextAreaContainer } from './styles';

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    allowAutoComplete?: boolean;
	className?: string;
	textareaClassName?: string;
	textareaId: string;
	textareaRef?: (ref: HTMLTextAreaElement) => void;
};

export const TextArea: React.FC<IProps> = ({
    className = '',
    textareaClassName = '',
    textareaId = '',
    textareaRef,
    onBlur,
    onFocus,
    ...restProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    let taRef: HTMLTextAreaElement;

    const onTextAreaBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    }

    const onTextAreaFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    }

    const onPaddingClicked = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!!taRef) {
			taRef.focus();
		}

		e.preventDefault();
		e.stopPropagation();
	};

    const onRef = (ref: HTMLTextAreaElement | null) => {
        if (ref) {
            taRef = ref;

            if (!!textareaRef) {
                textareaRef(ref);
            }
        }
	};

    return (
        <TextAreaContainer className={ `${className} ${isFocused && 'focused '}` } onClick={ onPaddingClicked }>
            <textarea
                className={ textareaClassName }
                id={ textareaId }
                ref={ onRef }
                onBlur={ onTextAreaBlur }
                onFocus={ onTextAreaFocus }
                { ...restProps }
            />
        </TextAreaContainer>
    )
}
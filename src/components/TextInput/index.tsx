import React, { useState, FocusEvent, FC } from 'react';

import { Container } from './styles';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	allowAutoComplete?: boolean;
	className?: string;
	inputClassName?: string;
	inputId: string;
	inputRef?: (ref: HTMLInputElement) => void;
	leftAccessory?: React.ReactNode;
	rightAccessory?: React.ReactNode;
	type?: string;
}

export const TextInput: FC<IProps> = ({
  allowAutoComplete,
  className,
  inputClassName,
  inputId,
  inputRef,
  onBlur,
  onFocus,
  leftAccessory,
  rightAccessory,
  type = 'text',
  ...restProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
	let inRef: HTMLInputElement;

    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    }

    const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    }

    const onPaddingClicked = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!!inRef) {
			inRef.focus();
		}

		e.preventDefault();
		e.stopPropagation();
	};

    const onRef = (ref: HTMLInputElement | null) => {
        if (ref) {
            inRef = ref;

            if (!!inputRef) {
                inputRef(ref);
            }
        }
	};

    return (
        <Container className={ `${isFocused && 'focused'} ${className} ${type}`} onClick={ onPaddingClicked }>
            { leftAccessory }
            <input
                { ...restProps }
                autoComplete={ allowAutoComplete ? 'on' : 'off' }
                className={ inputClassName }
                id={ inputId }
                onBlur={ onInputBlur }
                onFocus={ onInputFocus }
                ref={ onRef }
                type={ type }
            />
            { rightAccessory }
        </Container>
    );
};

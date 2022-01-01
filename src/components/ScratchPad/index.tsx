import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { withTheme } from 'styled-components';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { NoteIcon } from '../svgs/icons/NoteIcon';
import { TextArea } from '../TextArea';
import { PopoverType, TinyPopover } from '../TinyPopover';
import { ScratchPadContainer, ScratchPadWrapper } from './styles';

interface IProps extends IThemeProps {
    className?: string;
}

const ScratchPadBase: React.FC<IProps> = ({
    className = '',
    theme,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!!textareaRef.current && isOpen) {
            setTimeout(() => {
                textareaRef.current.focus();
            }, 10);
        }
    }, [isOpen]);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const onRef = (ref: HTMLTextAreaElement) => {
        textareaRef.current = ref;
    };

    const renderAnchor = () => {
        const id = 'scratch-pad-btn';
        return (
            <Button
                className={ id }
                id={ id }
                onClick={ () => setIsOpen(!isOpen) }
                buttonType={ ButtonType.Blank }
            >
                <NoteIcon />
            </Button>
        );
    };

    return (
        <ScratchPadContainer className={ className }>
            <TinyPopover
                dismissOnOutsideAction
                align='end'
                anchor={ renderAnchor() }
                isOpen={ isOpen }
                onRequestClose={ () => setIsOpen(false) }
                type={ PopoverType.custom }
            >
                <ScratchPadWrapper
                    backgroundColor={ theme.darkestGray }
                    borderColor={ theme.highlight1 }
                    borderWidth={ 1 }
                    childrenContainerClassName='scratch-pad-children-container'
                    config={ [{ position: AnglePos.BottomLeft, size: AngleSize.Small }] }
                >
                    <div className='header-container'>
                        <div className='header'>Scratch Pad</div>
                    </div>
                    <TextArea
                        className='scratch-pad'
                        textareaId='scratch-pad'
                        value={ value }
                        onChange={ onChange }
                        textareaRef={ onRef }
                    />
                </ScratchPadWrapper>
            </TinyPopover>
        </ScratchPadContainer>
    );
};

export const ScratchPad = withTheme(ScratchPadBase);

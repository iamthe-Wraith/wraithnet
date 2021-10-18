import { config, useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import React from 'react';
import { withTheme } from 'styled-components';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { XIcon } from '../svgs/icons/XIcon';

import { ModalOverlay } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    header?: string | JSX.Element;
    isOpen?: boolean;
    onClose:() => void;
}

const overlayFrom = { opacity: 0 };
const overlayTo = { opacity: 1 };
const modalFrom = { ...overlayFrom, transform: 'translate3d(-50%, -80%, 0)' };
const modalTo = { ...overlayTo, transform: 'translate3d(-50%, -50%, 0)' };

export const ModalBase: React.FC<IProps> = ({ children, className = '', header, isOpen, onClose, theme }) => {
    const overlaySpring = useSpring({
        config: config.gentle,
        from: overlayFrom,
        to: isOpen ? overlayTo : overlayFrom,
    });

    const modalSpring = useSpring({
        config: config.gentle,
       from: modalFrom,
       to: isOpen ? modalTo : modalFrom, 
    });

    const renderHeader = () => {
        return (
            <div className={ `modal-header ${ typeof header === 'string' && 'header-text font-1'}` }>
                <Button
                    className='close'
                    buttonType={ ButtonType.Blank }
                    onClick={ onClose }
                >
                    <XIcon fill={ theme.light } />
                </Button>
                { header }
            </div>
        );
    };

    const renderBody = () => {
        return (
            <div className='body'>
                { children }
            </div>
        )
    }

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay className={ className } style={ overlaySpring }>
            <animated.div className='modal-container' style={ modalSpring }>
                <AngleCorner
                    backgroundColor={ theme.dark }
                    borderColor={ theme.primary }
                    borderWidth={ 1 }
                    config={ [{ position: AnglePos.TopLeft, size: AngleSize.Medium }] }
                >
                    { renderHeader() }
                    { renderBody() }
                </AngleCorner>
            </animated.div>
        </ModalOverlay>
    );
}

export const Modal = withTheme(ModalBase);

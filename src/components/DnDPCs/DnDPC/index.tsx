import { observer } from 'mobx-react-lite';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { withTheme } from 'styled-components';
import { PCModel } from '../../../models/dnd/pc';
import { IThemeProps } from '../../../styles/themes';
import { Button, ButtonType } from '../../Button';
import { AnglePos, AngleSize, IAngleProps } from '../../containers/AngleCorner/styles';
import { DnDPCLevel } from '../../DnDPCLevel';
import { Modal } from '../../Modal';
import { XIcon } from '../../svgs/icons/XIcon';
import { TextInput } from '../../TextInput';

import { LeveledUpContainer, PCContainer, XPInputContainer } from './styles';

interface IProps extends IThemeProps, IAngleProps {
    className?: string;
    onClick:(pc: PCModel) => void;
    onEditClick:(pc: PCModel) => void;
    pc: PCModel;
}

const DnDPCBase: React.FC<IProps> = ({ className = '', onClick, onEditClick, pc, theme, ...restProps }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [showXPInput, setShowXPInput] = useState(false);
    const [xpValue, setXPValue] = useState('');
    const xpRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showXPInput) xpRef.current?.focus();
    }, [showXPInput]);

    const onMouseLeave = () => {
        setIsHovering(false);
        setShowXPInput(false);
    }

    const onXPChange = (value: string) => {
        const regex = /\d+/;
        let minus = '';
        let v = `${value}`;

        if (!v) {
            setXPValue('');
            return;
        }

        if (v[0] === '-') {
            minus = '-';
            v = v.split('-').join('');
        }
        if (v[0] === '+') {
            v = v.split('+').join('');
        }

        if (!v) {
            setXPValue(!!minus ? '-' : '+');
            return;
        }

        const digits = v.match(regex);
        const vv = parseInt(digits[0]);
        if (!isNaN(vv)) {
            setXPValue(`${!!minus ? '-' : '+'}${vv}`);
        }
    }

    const onXPInputClose = () => {
        setXPValue('');
        setShowXPInput(false);
    }

    const onXPKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            pc.updateExp(xpValue)
                .then(() => {
                    setXPValue('');
                    setShowXPInput(false);
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }
    }

    const onXPRef = (ref: HTMLInputElement | undefined) => {
        if (ref) {
            xpRef.current = ref;
        }
    }

    return (
        <PCContainer
            className={ `pc-container ${className}` }
            borderColor={ isHovering ? theme.primary : theme.gray }
            borderWidth={ 1 }
            config={[{position: AnglePos.TopRight, size: AngleSize.Tiny}, {position: AnglePos.BottomRight, size: AngleSize.Tiny}]}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={ onMouseLeave }
        >
            <Button
                className={ `pc-name ${className}` }
                buttonType={ ButtonType.Blank }
                onClick={() => onClick(pc)}
                { ...restProps }
            >
                <div>{ pc.name }</div>
            </Button>
            <div className='metadata'>
                <div>{ pc.race.name }</div>
                <div>{ pc.classes.map(c => c.name).join(', ') }</div>
            </div>
            <DnDPCLevel pc={ pc } />
            <div className='actions-container'>
                {
                    showXPInput
                        ? (
                            <XPInputContainer
                                backgroundColor={ theme.dark }
                                borderColor={ theme.primary }
                                borderWidth={ 1 }
                                config={[{position: AnglePos.TopRight, size: AngleSize.Tiny}]}
                            >
                                <Button
                                    buttonType={ ButtonType.Blank }
                                    className='xp-input-close'
                                    onClick={ onXPInputClose }
                                >
                                    <XIcon fill={ theme.light } />
                                </Button>
                                <TextInput
                                    className='xp-text-input'
                                    inputId={`pc-xp-${pc.id}`}
                                    onChange={e => onXPChange(e.target.value)}
                                    onKeyDown={ onXPKeyDown }
                                    inputRef={ onXPRef }
                                    value={ xpValue }
                                />
                            </XPInputContainer>
                        )
                        : (
                            <Button
                                className='pc-action-button'
                                buttonType={ ButtonType.Blank }
                                onClick={() => setShowXPInput(true)}
                            >
                                <div className='xp-icon'>xp</div>
                            </Button>
                        )
                }
            </div>
            {
                pc.leveledUp && (
                    <Modal
                        header={ `${pc.name} Levled Up!` }
                        onClose={ pc.resetLeveledUp}
                        isOpen={ pc.leveledUp }
                    >
                        <LeveledUpContainer>
                            <div>Now at level</div>
                            <div className='leveled-up-level'>{ pc.level }</div>
                        </LeveledUpContainer>
                    </Modal>
                )
            }
        </PCContainer>
    );
}

const DnDPCAObserver = observer(DnDPCBase);
export const DnDPC = withTheme(DnDPCAObserver);

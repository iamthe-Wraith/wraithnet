import { observer } from 'mobx-react-lite';
import React, { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { withTheme } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { PCModel } from '../../models/dnd/pc';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { DnDPCModal } from '../DnDPCModal';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { XIcon } from '../svgs/icons/XIcon';
import { TextInput } from '../TextInput';
import { DnDPC } from './DnDPC';
import { XPInputContainer } from './DnDPC/styles';

import { DnDPCsContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
}

// TODO: delete pcs
// - api
// - ui
// TODO: edit pcs
// - api
// - ui

// items to display in card
// - name
// - race
// - class (should support multiclassign)
// - level
// - exp

// clicking should open their information in modal or in primary display
// - inside details is where the data can be edited and characters can be deleted.

/*
    API model
    - name
    - race
    - class
    - exp
    - level
    - events (like birthday)
    - inventory
    - contacts(npcs) (will need to be able to add notes for how they know them...these will need to be stored separately from the npc's info)
    - notes/content (used in editor)
*/


const DnDPCsBase: React.FC<IProps> = ({ className = '', theme }) => {
    const dnd = useContext(DnDContext);
    const [showPCModal, setShowPCModal] = useState(false);
    const [showXPInput, setShowXPInput] = useState(false);
    const [xpValue, setXPValue] = useState('');
    const xpRef = useRef<HTMLInputElement>(null);
    const [selectedPC, setSelectedPC] = useState<PCModel>(null);

    useEffect(() => {
        dnd.campaign.loadPCs()
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        xpRef.current?.focus();
    }, [showXPInput]);

    const onClose = () => {
        setSelectedPC(null);
        setShowPCModal(false)
    }

    const onSave = (pc: PCModel) => {
        if (!selectedPC) setSelectedPC(pc);
    }

    const onPCClick = (pc: PCModel) => {
        setSelectedPC(pc);
        console.log(`opening pc details for ${pc.name}`)
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
            dnd.campaign.updatePartyXP(xpValue)
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

    const renderPCs = () => {
        if (dnd.campaign.loadingPCs) {
            return (
                <LoadingSpinner
                    className='spinner'
                    size={ SpinnerSize.Small }
                    type={ SpinnerType.Random }
                />
            )
        }

        return dnd.campaign.pcs.map(pc => (
            <DnDPC
                key={ pc.id }
                className='pc'
                onClick={ onPCClick }
                onEditClick={() => setSelectedPC(pc)}
                pc={ pc }
            />
        ))
    };

    return (
        <DnDPCsContainer className={ className }>
            <div className='header'>
                <div className='header-text'>PCs</div>
                <div>
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
                                        inputId={`pcs-xp-input`}
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
                                    <div className='xp-icon'>party xp</div>
                                </Button>
                            )
                    }
                </div>
            </div>
            <div className='pc-list-container'>
                { renderPCs() }
            </div>
            <div className='add-pc-container'>
                <Button
                    buttonType={ ButtonType.BlankReverse }
                    onClick={() => setShowPCModal(true)}
                >
                    + add pc
                </Button>
            </div>
            {
                (showPCModal || !!selectedPC) && (
                    <DnDPCModal
                        isOpen
                        onClose={ onClose }
                        onSave={ onSave }
                        pc={ selectedPC }
                    />
                )
            }
        </DnDPCsContainer>
    );
}

export const DnDPCsAsObserver = observer(DnDPCsBase);
export const DnDPCs = withTheme(DnDPCsAsObserver);

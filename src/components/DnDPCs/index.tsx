import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { PCModel } from '../../models/dnd/pc';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { DnDPCModal } from '../DnDPCModal';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { DnDPC } from './DnDPC';

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
    const [selectedPC, setSelectedPC] = useState<PCModel>(null);

    useEffect(() => {
        dnd.campaign.loadPCs()
            .catch(err => {
                console.error(err);
            });
    }, []);

    const onClick = (pc: PCModel) => {
        setSelectedPC(pc);
    }
    
    const onClose = () => {
        setSelectedPC(null);
        setShowPCModal(false)
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
                onClick={ onClick }
                pc={ pc }
            />
        ))
    };

    return (
        <DnDPCsContainer className={ className }>
            <div className='header'>PCs</div>
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
                        pc={ selectedPC }
                    />
                )
            }
        </DnDPCsContainer>
    );
}

export const DnDPCsAsObserver = observer(DnDPCsBase);
export const DnDPCs = withTheme(DnDPCsAsObserver);

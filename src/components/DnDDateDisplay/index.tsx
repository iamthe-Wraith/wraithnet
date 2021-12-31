import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { ToasterContext } from '../../contexts/Toaster';
import { Button, ButtonType } from '../Button';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { ChevronIcon, ChevronOrientation } from '../svgs/icons/ChevronIcon';
import { PopoverType, TinyPopover } from '../TinyPopover';
import { ControlsContainer, DnDDateDisplayContainer } from './styles';

interface IProps {
    className?: string;
}

export const DnDDateDisplayBase: React.FC<IProps> = ({
    className = '',
}) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const toaster = useContext(ToasterContext);
    const dnd = useContext(DnDContext);
    const [isOpen, setIsOpen] = useState(false);

    const onChangeClick = (direction: 'next' | 'previous') => async () => {
        try {
            await dnd.campaign.changeDate(direction);
            setIsOpen(false);
            toaster.push({ message: 'Campaign date updated' });
        } catch (err: any) {
            errorMessages.push({ message: err.message });
        }
    };

    const renderAnchor = () => {
        if (dnd.campaign.changingDate) return <LoadingSpinner size={ SpinnerSize.Small } />;
    
        return (
            <Button
                buttonType={ ButtonType.Blank }
                onClick={ () => setIsOpen(!isOpen) }
            >
                { dnd.campaign.currentDate.stringify() }
            </Button>
        );
    };

    return (
        <DnDDateDisplayContainer className={ className }>
            <TinyPopover
                dismissOnOutsideAction
                anchor={ renderAnchor() }
                isOpen={ isOpen }
                onRequestClose={ () => setIsOpen(false) }
                placement={ ['bottom'] }
                type={ PopoverType.primaryDark }
            >
                <ControlsContainer>
                    <Button
                        buttonType={ ButtonType.Blank }
                        onClick={ onChangeClick('previous') }
                    >
                        <ChevronIcon
                            className='with-fill'
                            orientation={ ChevronOrientation.Left }
                        />
                    </Button>
                    <Button
                        buttonType={ ButtonType.Blank }
                        onClick={ onChangeClick('next') }
                    >
                        <ChevronIcon
                            className='with-fill'
                            orientation={ ChevronOrientation.Right }
                        />
                    </Button>
                </ControlsContainer>
            </TinyPopover>
        </DnDDateDisplayContainer>
    );
};

export const DnDDateDisplay = observer(DnDDateDisplayBase);

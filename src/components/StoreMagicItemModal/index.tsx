import React from 'react';
import { IStoreMagicItemRef } from '../../models/dnd/shop';
import { IModalProps } from '../Modal';
import { StoreMagicItemModalContainer, StoreMagicItemModalInner } from './styles';

interface IProps extends IModalProps {
    magicItem?: IStoreMagicItemRef;
}

export const StoreMagicItemModal: React.FC<IProps> = ({
    className = '',
    isOpen,
    magicItem,
    onClose,
}) => {
    return (
        <StoreMagicItemModalContainer
            className={ className }
            header={ magicItem?.name || 'New Magic Item' }
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <StoreMagicItemModalInner>
                viewing { magicItem?.name }
            </StoreMagicItemModalInner>
        </StoreMagicItemModalContainer>
    );
};

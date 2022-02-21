import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { StoreMagicItemModel } from '../../models/dnd/shop';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { IModalProps } from '../Modal';
import { Description, ErrorMessage, StoreMagicItemModalContainer, StoreMagicItemModalInner } from './styles';

interface IProps extends IModalProps {
    magicItem?: StoreMagicItemModel;
}

const StoreMagicItemModalBase: React.FC<IProps> = ({
    className = '',
    isOpen,
    magicItem,
    onClose,
}) => {
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('>>>>> magic item change detected', magicItem?.name);
        magicItem?.load()
            .catch(err => {
                setError(err.message);
            });
    }, [magicItem]);

    const renderContent = () => {
        if (magicItem.busy) return <LoadingSpinner size={ SpinnerSize.Small } />;

        if (!!error) {
            return (
                <ErrorMessage>{ error }</ErrorMessage>
            );
        }

        const desc = magicItem.desc.map((d, i) => <p key={ `desc-${i}` }>{ d }</p>);

        return (
            <Description>
                { desc }
            </Description>
        );
    };

    if (!magicItem) return null;

    return (
        <StoreMagicItemModalContainer
            className={ className }
            header={ magicItem?.name || 'New Magic Item' }
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <StoreMagicItemModalInner>
                { renderContent() }
            </StoreMagicItemModalInner>
        </StoreMagicItemModalContainer>
    );
};

export const StoreMagicItemModal = observer(StoreMagicItemModalBase);

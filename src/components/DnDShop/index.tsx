import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef } from 'react';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { ShopModel } from '../../models/dnd/shop';
import { DnDShopContainer } from './styles';

interface IProps {
    className?: string;
}

const DnDShopBase: React.FC<IProps> = ({ className = '' }) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const shop = useRef(new ShopModel()).current;

    useEffect(() => {
        shop.loadInventory()
            .catch(err => {
                errorMessages.push({ message: err.message });
            });
    }, []);

    return (
        <DnDShopContainer className={ className }>
            <div className='header'>Shop Inventory</div>
            {
                shop.inventory?.items?.length
            }
        </DnDShopContainer>
    );
};

export const DnDShop = observer(DnDShopBase);

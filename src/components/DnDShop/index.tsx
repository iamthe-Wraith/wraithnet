import { observer } from 'mobx-react';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { ToasterContext } from '../../contexts/Toaster';
import { IStoreItemRef, IStoreMagicItemRef, Rarity, ShopModel, StoreMagicItemModel } from '../../models/dnd/shop';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { StoreMagicItemModal } from '../StoreMagicItemModal';
import { EyeIcon } from '../svgs/icons/EyeIcon';
import { MagicIcon } from '../svgs/icons/MagicIcon';
import { PlusIcon } from '../svgs/icons/PlusIcon';
import { TextInput } from '../TextInput';
import { AllItemsContainer, Container, DnDShopContainer, FilterContainer, Item, ItemsContainer, MagicItem, RaritiesFilter, SelectedItem, SelectedItems, SelectedItemsContainer, ValueControl, ValueControlsContainer } from './styles';

const DEFAULT_MAX_QUANTITY = 5;
const DEFAULT_TOTAL_ITEMS_COUNT = 20;

interface IProps {
    className?: string;
}

interface ISelectedItem {
    item: IStoreItemRef;
    quantity: number;
}

const magicItemPricesByRarity = {
    common: {
        minRecommendedLevel: 1,
        value: {
            min: {
                quantity: 50,
                unit: 'gp',
            },
            max: {
                quantity: 100,
                unit: 'gp',
            },
        },
    },
    uncommon: {
        minRecommendedLevel: 1,
        value: {
            min: {
                quantity: 101,
                unit: 'gp',
            },
            max: {
                quantity: 500,
                unit: 'gp',
            },
        },
    },
    rare: {
        minRecommendedLevel: 5,
        value: {
            min: {
                quantity: 501,
                unit: 'gp',
            },
            max: {
                quantity: 5000,
                unit: 'gp',
            },
        },
    },
    'very rare': {
        minRecommendedLevel: 11,
        value: {
            min: {
                quantity: 5001,
                unit: 'gp',
            },
            max: {
                quantity: 50000,
                unit: 'gp',
            },
        },
    },
    legendary: {
        minRecommendedLevel: 17,
        value: {
            min: {
                quantity: 50001,
                unit: 'gp',
            },
            max: {
                quantity: 1000000,
                unit: 'gp',
            },
        },
    },
};

interface IRarityFilter {
    rarity: Rarity;
    selected: boolean;
}

const defaultRaritiesFilter: IRarityFilter[] = [
    {
        rarity: 'common',
        selected: true,
    },
    {
        rarity: 'uncommon',
        selected: true,
    },
    {
        rarity: 'rare',
        selected: true,
    },
    {
        rarity: 'very rare',
        selected: true,
    },
    {
        rarity: 'legendary',
        selected: true,
    },
];

const DigitsRegex = /\d+/gm;

const DnDShopBase: React.FC<IProps> = ({ className = '' }) => {
    const toaster = useContext(ToasterContext);
    const errorMessages = useContext(ErrorMessagesContext);
    const shop = useRef(new ShopModel()).current;
    const [maxQuantity, setMaxQuantity] = useState(DEFAULT_MAX_QUANTITY);
    const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
    const [selectedMagicItems, setSelectedMagicItems] = useState<StoreMagicItemModel[]>([]);
    const [totalItemsCount, setTotalItemsCount] = useState(DEFAULT_TOTAL_ITEMS_COUNT);
    const [raritiesFilter, setRaritiesFilter] = useState<IRarityFilter[]>(defaultRaritiesFilter);
    const [magicItemToView, setMagicItemToView] = useState<StoreMagicItemModel>(null);

    useEffect(() => {
        shop.loadInventory()
            .catch(err => {
                errorMessages.push({ message: err.message });
            });
    }, []);

    useEffect(() => {
        if ((selectedItems.length + selectedMagicItems.length) > totalItemsCount) {
            setTotalItemsCount(selectedItems.length);
        }
    }, [selectedItems, selectedMagicItems]);

    useEffect(() => {
        if (!!selectedItems.length) {
            const updatedSelectedItems = selectedItems.map(selectedItem => ({
                ...selectedItem,
                quantity: getQuantity(),
            }));
            setSelectedItems(updatedSelectedItems);
        }
    }, [maxQuantity]);

    const getMagicItemCost = (magicItem: IStoreMagicItemRef) => {
        const magicItemCost = magicItemPricesByRarity[magicItem.rarity];
        return `${ magicItemCost.value.max.quantity}${ magicItemCost.value.max.unit}`;
    };

    const getQuantity = () => {
        return Math.floor(Math.random() * maxQuantity) + 1;
    };

    const onAddMagicItemClick = () => {
        console.log('adding new magic item');
    };

    const onClearListClick = () => {
        setSelectedItems([]);
        setSelectedMagicItems([]);
        toaster.push({ message: 'Shop inventory cleared'});
    };

    const onCopyListClick = () => {
        const itemList = selectedItems
            .map(selectedItem => {
                return `name:\t\t${selectedItem.item.name}\nprice:\t\t${ selectedItem.item.cost.quantity }${ selectedItem.item.cost.unit }\nquantity:\t${ selectedItem.quantity }x\n`;
            })
            .join('\n');

        const magicItemList = selectedMagicItems
            .map(selectedMagicItem => {
                return `name:\t\t${selectedMagicItem.name}\nrarity:\t\t${ selectedMagicItem.rarity }\nprice:\t\t${ getMagicItemCost(selectedMagicItem) }\n`;
            })
            .join('\n');
        navigator.clipboard.writeText(`${itemList}\n\n--------------------\n\n${magicItemList}`);
        toaster.push({ message: 'Shop inventory copied to clipboard'});
    };

    const onFillListClick = () => {
        const _selectedItems = [...selectedItems];

        while ((_selectedItems.length + selectedMagicItems.length) < totalItemsCount) {
            const availablabileItems = shop.items.filter(i => {
                return !_selectedItems.find(selectedItem => i.id === selectedItem.item.id);
            });

            const randomItemIndex = Math.floor(Math.random() * (availablabileItems.length - 1));
            const quantity = getQuantity();
            _selectedItems.push({ item: availablabileItems[randomItemIndex], quantity });
        }

        setSelectedItems(_selectedItems);
    };

    const onItemClick = (item: IStoreItemRef) => () => {
        const alreadySelected = !!selectedItems.find(i => i.item.id === item.id);

        if (alreadySelected) {
            setSelectedItems(selectedItems.filter(i => i.item.id !== item.id));
        } else {
            const quantity = getQuantity();
            setSelectedItems([...selectedItems, { item, quantity }]);
        }
    };

    const onMagicItemClick = (item: StoreMagicItemModel) => () => {
        const alreadySelected = !!selectedMagicItems.find(i => i.id === item.id);

        if (alreadySelected) {
            setSelectedMagicItems(selectedMagicItems.filter(i => i.id !== item.id));
        } else {
            setSelectedMagicItems([...selectedMagicItems, item]);
        }
    };

    const onRarityFilterChange = (rarity: IRarityFilter) => () => {
        const updatedRarityFilters = [...raritiesFilter].map(filter => {
            if (filter.rarity === rarity.rarity) filter.selected = !filter.selected;
            return filter;
        });

        setRaritiesFilter(updatedRarityFilters);
    };

    const onSelectedItemClick = (selectedItem: ISelectedItem) => () => {
        console.log('selected item clicked', selectedItem.item.name);
    };

    const onStoreMagicItemModalClose = () => {
        setMagicItemToView(null);
    };

    const onValueControlChange = (handler: React.Dispatch<React.SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value.match(DigitsRegex).join(''));
        if (!isNaN(value)) handler(value);
    };

    const onViewMagicItemClick = (magicItem: StoreMagicItemModel) => () => {
        setMagicItemToView(magicItem);
    };

    const renderAllItems = () => {
        let items: JSX.Element[] = [];

        if (!shop.busy && !!shop?.items?.length) {
            items = shop.items.map(item => (
                <Item
                    key={ item.id }
                    className={ !!selectedItems.find(i => i.item.id === item.id) ? 'selected' : '' }
                    buttonType={ ButtonType.Blank }
                    onClick={ onItemClick(item) }
                >
                    { item.name }
                </Item>
            ));
        }

        if (shop.busy) {
            items.push((
                <LoadingSpinner key='spinner' size={ SpinnerSize.Small } />
            ));
        }

        return (
            <ItemsContainer className='items-container'>
                <div className='items-header'>Items</div>
                <div className='items-list'>
                    { items }
                </div>
            </ItemsContainer>
        );
    };

    const renderAllMagicItems = () => {
        let items: JSX.Element[] = [];

        if (!shop.busy && !!shop?.magicItems?.length) {
            items = shop.magicItems
                .filter(item => {
                    const rarity = raritiesFilter.find(r => r.rarity === item.rarity);
                    if (!rarity || !rarity.selected) return false;
                    return true;
                })
                .map(item => (
                    <MagicItem
                        key={ item.id }
                        className={ !!selectedMagicItems.find(i => i.id === item.id) ? 'selected' : '' }
                    >
                        <Button
                            buttonType={ ButtonType.Blank }
                            onClick={ onMagicItemClick(item) }
                        >
                            <div className='item-name'>{ item.name }</div>
                            <div className='item-rarity'>{ item.rarity }</div>
                        </Button>
                        <Button
                            buttonType={ ButtonType.Blank }
                            onClick={ onViewMagicItemClick(item) }
                        >
                            <EyeIcon />
                        </Button>
                    </MagicItem>
                ));
        }

        if (shop.busy) {
            items.push((
                <LoadingSpinner key='spinner' size={ SpinnerSize.Small } />
            ));
        }

        return (
            <ItemsContainer>
                <div className='items-header'>
                    Magic Items
                    <div>
                        <Button
                            buttonType={ ButtonType.Blank }
                            onClick={ onAddMagicItemClick }
                        >
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
                <div className='items-list'>
                    { items }
                </div>
            </ItemsContainer>
        );
    };

    const renderRarityFilter = () => {
        const checkboxes = raritiesFilter.map(rarity => {
            const id = `rarity-checkbox-${rarity.rarity}`;
            return (
                <Checkbox
                    key={ id }
                    id={ id }
                    label={ rarity.rarity }
                    checked={ rarity.selected }
                    onChange={ onRarityFilterChange(rarity) }
                />
            );
        });

        return (
            <RaritiesFilter>
                <div className='filter-label'>Rarities</div>
                <div>
                    { checkboxes }
                </div>     
            </RaritiesFilter>
        );
    };

    const renderSelectedItems = () => {
        const _selectedItems = selectedItems.map(selectedItem => (
            <SelectedItem
                key={ selectedItem.item.id }
                onClick={ onSelectedItemClick(selectedItem) }
            >
                <div className='name'>{ selectedItem.item.name }</div>
                <div className='cost'>{ `${selectedItem.item.cost.quantity}${selectedItem.item.cost.unit}` }</div>
                <div className='quantity'>{ selectedItem.quantity }</div>
            </SelectedItem>
        ));

        const _selectedMagicItems = selectedMagicItems.map(selectedMagicItem => (
            <SelectedItem
                key={ selectedMagicItem.id }
                onClick={ onViewMagicItemClick(selectedMagicItem) }
            >
                <div className='name'>
                    <MagicIcon />
                    { selectedMagicItem.name }
                </div>
                <div className='cost'>{ selectedMagicItem.rarity }</div>
                <div className='quantity'>M</div>
            </SelectedItem>
        ));

        return (
            <SelectedItems>
                { _selectedItems }
                { _selectedMagicItems }
            </SelectedItems>
        );
    };

    return (
        <DnDShopContainer className={ className }>
            <div className='header'>Shop Inventory</div>
            <Container>
                <AllItemsContainer>
                    { renderAllItems() }
                    { renderAllMagicItems() }
                </AllItemsContainer>
                <SelectedItemsContainer>
                    <ValueControlsContainer>
                        <div>
                            <ValueControl>
                                <div className='label'>Total Items</div>
                                <TextInput
                                    inputId='total-items-count'
                                    className='input'
                                    value={ totalItemsCount || '--' }
                                    onChange={ onValueControlChange(setTotalItemsCount) }
                                />
                            </ValueControl>
                            <ValueControl>
                                <div className='label'>Max Quantity</div>
                                <TextInput
                                    inputId='max-quantity'
                                    className='input'
                                    value={ maxQuantity }
                                    onChange={ onValueControlChange(setMaxQuantity) }
                                />
                            </ValueControl>
                        </div>
                        <Button
                            buttonType={ ButtonType.Primary }
                            disabled={ !totalItemsCount || selectedItems.length >= totalItemsCount }
                            onClick={ onFillListClick }
                        >
                            Fill List
                        </Button>
                        <div>
                            <Button
                                buttonType={ ButtonType.Primary }
                                disabled={ !selectedItems.length && !selectedMagicItems.length }
                                onClick={ onCopyListClick }
                            >
                            Copy List
                            </Button>
                            <Button
                                buttonType={ ButtonType.Blank }
                                disabled={ !selectedItems.length && !selectedMagicItems.length }
                                onClick={ onClearListClick }
                            >
                            Clear
                            </Button>
                        </div>
                    </ValueControlsContainer>
                    <FilterContainer>
                        { renderRarityFilter() }
                    </FilterContainer>
                    { renderSelectedItems() }
                </SelectedItemsContainer>
            </Container>
            <StoreMagicItemModal
                isOpen={ !!magicItemToView }
                magicItem={ magicItemToView }
                onClose={ onStoreMagicItemModalClose }
            />
        </DnDShopContainer>
    );
};

export const DnDShop = observer(DnDShopBase);

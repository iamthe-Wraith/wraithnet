import styled, { css } from 'styled-components';
import { FlexHorizontalCenter, NoScrollBar, PrimaryFont } from '../../styles/styles';
import { Button } from '../Button';

const ItemStyles = css`
    display: block;
    min-width: 100%;
    padding: 2px 10px;
    text-align: left;

    &.selected {
        color: ${({theme}) => theme.highlight1};

        &:hover {
            color: ${({theme}) => theme.highlight1};
        }

        .item-name {
            color: ${({theme}) => theme.highlight1};
        }

        .item-rarity {
            color: ${({theme}) => theme.darkGray};
        }
    }
`;

export const AllItemsContainer = styled.div`
    min-width: 250px;
    max-width: 250px;
    padding: 0 10px;
    border-right: ${({theme}) => `1px solid ${theme.darkestGray}`};
`;

export const Container = styled.div`
    ${ FlexHorizontalCenter }
    height: calc(100% - 35px);

    & > * {
        align-items: flex-start;
        min-height: 100%;
        height: 100%;
        max-height: 100%;
    }
`;

export const DnDShopContainer = styled.div`
    .header {
        ${ PrimaryFont }
        height: 25px;
        margin-bottom: 10px;
        font-size: 18px;
        color: ${({theme}) => theme.primary };
        text-align: center;
    }
`;

export const FilterContainer = styled.div`
    margin-bottom: 10px;
    padding: 10px 10px 15px;
    border-bottom: ${({theme}) => `1px solid ${ theme.darkestGray }`};

    .filter-label {
        ${ PrimaryFont }
        padding-bottom: 3px;
        font-size: 12px;
        color: ${({theme}) => theme.primary};
    }
`;

export const Item = styled(Button)`
    ${ ItemStyles }
`;

export const ItemsContainer = styled.div`
    height: 50%;

    &:first-child {
        .items-header {
            padding: 0 0 5px;
        }
    }

    .items-header {
        ${ PrimaryFont }
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        padding: 10px 0 5px;
        font-size: 14px;
        color: ${({theme}) => theme.primary};
        text-align: left;

        button {
            &:hover {
                svg {
                    fill: ${({theme}) => theme.primaryDark};
                }
            }

            svg {
                width: auto;
                height: 16px;
                fill: ${({theme}) => theme.primary};
            }
        }
    }

    .items-list {
        ${ NoScrollBar }
        height: calc(100% - 35px);
        overflow: auto;
    }
`;

export const MagicItem = styled.div`
    ${ ItemStyles }
    ${ FlexHorizontalCenter }

    &:hover {
        button:last-child {
            display: block;
        }
    }

    button:first-child {
        display: block;
        min-width: calc(100% - 30px);
        max-width: calc(100% - 30px);
        padding: 3px 10px 3px 0;
        text-align: left;
    }

    button:last-child {
        display: none;
        min-width: 30px;
        max-width: 30px;
        padding: 0;

        &:hover {
            svg {
                fill: ${({theme}) => theme.highlight1};
            }
        }

        svg {
            width: 20px;
            height: auto;
            fill: ${({theme}) => theme.light};
        }
    }

    .item-rarity {
        font-size: 11px;
        color: ${({theme}) => theme.primary};
    }
`;

export const RaritiesFilter = styled.div`
    & > div {
        padding-left: 10px;
        ${ FlexHorizontalCenter }

        & > * {
            margin-right: 20px;
        }
    }
`;

export const SelectedItem = styled.div`
    ${ FlexHorizontalCenter }
    justify-content: space-between;
    padding: 2px 10px;

    &:nth-child(2n) {
        background: ${({theme}) => theme.darkestGray};
    }

    .name {
        ${ FlexHorizontalCenter }
        min-width: calc(100% - 150px);
        max-width: calc(100% - 150px);

        & > svg {
            width: auto;
            height: 16px;
            margin-right: 15px;
            fill: ${({theme}) => theme.light};
        }
    }

    .cost {
        min-width: 100px;
        max-width: 100px;
        text-align: right;
    }

    .quantity {
        min-width: 50px;
        max-width: 50px;
        text-align: right;
    }
`;

export const SelectedItems = styled.div`
    ${ NoScrollBar }
    max-height: calc(100% - 60px);
    overflow: auto;
`;

export const SelectedItemsContainer = styled.div`
    min-width: calc(100% - 250px);
    max-width: calc(100% - 250px);
`;

export const ValueControl = styled.div`
    .label {
        color: ${({theme}) => theme.darkGray};
        font-size: 12px;
    }

    .input {
        width: 100px;
    }
`;

export const ValueControlsContainer = styled.div`
    ${ FlexHorizontalCenter }
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 10px 10px;   
    border-bottom: 1px solid ${({theme}) => theme.darkestGray};

    & > div {
        ${ FlexHorizontalCenter }

        & > *:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

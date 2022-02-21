import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Modal } from '../Modal';

export const AddItemToInventoryModalContainer = styled(Modal)<IThemeProps>`
    .modal-container .body {
        ${ FlexHorizontalCenter }
        flex-direction: row;
        align-items: flex-start;
        width: 600px;
        height: 500px;
    }
`;

export const FilterContainer = styled.div`
    position: relative;
    ${ FlexCol }
    min-width: 220px;
    max-width: 220px;
    min-height: 100%;
    max-height: 100%;
    margin-right: 30px;

    .tags-list {
        flex-grow: 1;
    }
`;

export const ItemsList = styled.div<IThemeProps>`
    ${ FlexCol }
    ${ NoScrollBar }
    flex-grow: 1;
    height: calc(100% - 38px);
    overflow: auto;

    .item-to-add {
        text-align: left;
    }

    .selected {
        color: ${({theme}) => theme.primary};
    }

    button {
        justify-content: flex-start;
    }
`;

export const ItemListContainer = styled.div`
    flex-grow: 1;
    position: relative;
    height: 100%;
`;

export const NoItems = styled.div<IThemeProps>`
    color: ${({theme}) => theme.gray};
`;

export const SearchContainer = styled.div`
    .clear-search-container {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        padding-bottom: 10px;

        button {
            padding-top: 4px;
        }
    }
`;

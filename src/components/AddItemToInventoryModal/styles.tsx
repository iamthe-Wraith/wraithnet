import styled from 'styled-components';
import { FlexCol } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Modal } from '../Modal';

export const AddItemToInventoryModalContainer = styled(Modal)<IThemeProps>`
    .modal-container {
        ${ FlexCol }
        min-width: 250px;
        max-width: 250px;
        min-height: auto;
        max-height: 500px;
    }
`;

export const ItemsList = styled.div<IThemeProps>`
    ${ FlexCol }
    flex-grow: 1;

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

export const NoItems = styled.div<IThemeProps>`
    color: ${({theme}) => theme.gray};
`;

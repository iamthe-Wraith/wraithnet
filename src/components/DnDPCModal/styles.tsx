import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Modal } from '../Modal';

export const DnDPCModalContainer = styled(Modal)<IThemeProps>`
    .flex-row {
        ${ FlexHorizontalCenter }
    }
`;

export const FieldContainer = styled.div<IThemeProps>`
    flex-grow: 1;
    margin-bottom: 10px;
    padding: 0 5px;

    .dropdown-anchor {
        width: 100%;
        border: ${({theme}) => `1px solid ${theme.gray}`};
    }

    .error {
        font-size: 12px;
        color: ${({theme}) => theme.error};
    }
`;
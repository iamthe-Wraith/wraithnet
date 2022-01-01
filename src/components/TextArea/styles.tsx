import styled from 'styled-components';
import { IThemeProps } from '../../styles/themes';

export const TextAreaContainer = styled.div<IThemeProps>`
    border: 1px solid ${({theme}) => theme.gray};

    &.focused {
        border: 1px solid ${({theme}) => theme.light};
    }

    textarea {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        resize: none;
    }
`;
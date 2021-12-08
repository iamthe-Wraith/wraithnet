import styled from 'styled-components';
import { NoScrollBar } from '../../../../styles/styles';
import { IThemeProps } from '../../../../styles/themes';

export const RefComponentAnchor = styled.span<IThemeProps>`
    position: relative;

    &.error:before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${({theme}) => theme.error};
    }
`;

export const RefComponentContent = styled.div<IThemeProps>`
    ${ NoScrollBar }
    width: 500px;
    min-height: 600px;
    max-height: 600px;
    padding: 10px;
    overflow: auto;

    img {
      max-width: 100%;
    }
`;

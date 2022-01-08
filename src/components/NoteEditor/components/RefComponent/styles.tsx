import styled from 'styled-components';
import { FlexCenter, NoScrollBar } from '../../../../styles/styles';
import { IThemeProps } from '../../../../styles/themes';

export const RefComponentAnchor = styled.span<IThemeProps>`
    position: relative;
    color: ${({ theme }) => theme.highlight1};

    &:hover {
        cursor: default;
        color: ${({ theme }) => theme.highlight2};
    }

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
    width: 65vw;
    height: calc(75vh - 100px);
    overflow: auto;

    &.invalid-path {
      ${ FlexCenter }
    }

    img {
      max-width: 100%;
    }

    .invalid-path-msg {
      color: ${({theme}) => theme.error};      
    }
`;

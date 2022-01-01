import { animated } from 'react-spring';
import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const ToasterContainer = styled(animated.div)<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: stretch;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;

    &.success {
        .ang {
            background: ${({theme}) => theme.primary};
        }

        .text-container {
            border: ${({theme}) => `1px solid ${theme.primary}`};
        }
    }

    &.warning {
        .ang {
            background: ${({theme}) => theme.highlight1};
        }

        .text-container {
            border: ${({theme}) => `1px solid ${theme.highlight1}`};
        }
    }

    &.error {
        .ang {
            background: ${({theme}) => theme.error};
        }
        
        .text-container {
            border: ${({theme}) => `1px solid ${theme.error}`};
        }
    }

    .ang {
        position: relative;
        width: 10px;
        margin-left: 2px;
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%);

        &:before {
            content: ' ';
            position: absolute;
            top: 5px;
            left: 1px;
            display: block;
            width: 8px;
            height: 8px;
            background: #000;
        }
    }

    .text-container {
        padding: 5px 10px;
        font-size: 14px;
        background: ${({theme}) => theme.dark};
        color: white;
        white-space: nowrap;
        overflow: hidden;
    }
`;

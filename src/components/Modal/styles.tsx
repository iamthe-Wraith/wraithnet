import { animated } from '@react-spring/web';
import styled from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const ModalOverlay = styled(animated.div)<IThemeProps>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({theme}) => `${theme.dark}44`};
    z-index: 5;

    .modal-container {
        ${ AbsoluteCenter }
        min-width: 400px;
        min-height: 200px;
    }

    .modal-header {
        position: relative;
        display: flex;
        align-items: center;
        height: 45px;
        padding-left: 45px;

        &.header-text {
            font-size: 18px;
        }

        .close {
            position: absolute;
            top: 0;
            right: 0;
            padding: 0;
        }
    }

    .body {
        padding: 10px 20px 20px;
    }
`;

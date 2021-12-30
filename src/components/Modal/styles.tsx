import { animated } from '@react-spring/web';
import styled from 'styled-components';
import { AbsoluteCenter, FlexCol } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const ModalOverlay = styled(animated.div)<IThemeProps>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({theme}) => `${theme.dark}44`};
    z-index: 5;
`;

export const ModalContainer = styled(animated.div)<IThemeProps>`
    ${ AbsoluteCenter }
    display: flex;

    .modal-angle-corner {
        min-width: 100%;
        min-height: 100%;
    }

    .angle-corner-children-container {
        ${ FlexCol }
        max-height: 100%;
        overflow: hidden;
    }

    &.small-modal {
        min-width: 250px;
        max-width: 250px;
        min-height: 100px;
        max-height: 30vh;

        .modal-header {
            padding-left: 25px;
        }
    }

    &.medium-modal {
        min-width: 400px;
        max-width: 400px;
        min-height: 200px;
        max-height: 50vh;
    }

    &.large-modal {
        min-width: 60vw;
        max-width: 60vw;
        min-height: 90vh;
        max-height: 90vh;
    }

    &.extra-large-modal {
        min-width: 80vw;
        max-width: 80vw;
        min-height: 90vh;
        max-height: 90vh;
    }

    .modal-header {
        position: relative;
        display: flex;
        align-items: center;
        min-height: 45px;
        max-height: 45px;
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
        ${ FlexCol }
        flex-grow: 1;
        max-height: 100%;
        padding: 10px 20px;
        overflow: hidden;
    }
`;

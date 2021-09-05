import styled, { css } from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';
import { SpinnerSize } from '.';

const tiny = 25;
const small = 50;
const medium = 80;
const large = 120;

export const Container = styled.div`
    ${ AbsoluteCenter }
    .loading-spinner-content {
        position: absolute;
        color: white;
        font-size: 12px;
        left: 50%;
        padding-top: 8px;
        text-align: center;
        top: 100%;
        transform: translateX(-50%);
        width: 250px;
    }
`;

export const Spinner = styled.div<{ size: SpinnerSize }>`
    ${props => {
        switch (props.size) {
        case 'tiny':
            return css`
            width: ${tiny}px;
            height: ${tiny}px;
            `;
        case 'small':
            return css`
            width: ${small}px;
            height: ${small}px;
            `;
        case 'large':
            return css`
            width: ${large}px;
            height: ${large}px;
            `;
        default:
            return css`
            width: ${medium}px;
            height: ${medium}px;
            `;
        }
    }}

    & > * {
        height: 100%;
        width: 100%;
    }
`;

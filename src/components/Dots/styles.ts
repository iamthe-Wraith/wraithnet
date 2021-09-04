import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const cellSize = 20;

interface IProps extends IThemeProps {
    height?: string;
    width?: string;
}

export const Dot = styled(FlexCenter)`
    height: ${ cellSize }px;
    width: ${ cellSize }px;

    &:before {
        content: ' ';
        display: block;
        height: ${ Math.floor(cellSize / 2) }px;
        width: ${ Math.floor(cellSize / 2) }px;
        border-radius: 50%;
        background: ${({theme}) => theme.darkGray}30;
    }
`;

export const DotsContainer = styled.div<IProps>`
    display: flex;
    flex-wrap: wrap;
    min-width: ${({width}) => width || '100%'};
    min-height: ${({height}) => height || '100%'};
`;
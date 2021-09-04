import styled from 'styled-components';
import { IThemeProps } from '../../styles/themes';

export const footerHeight = 50;

export const FooterContainer = styled.div`
    border-top: 1px solid ${({theme}: IThemeProps) => theme.darkerGray};
    height: ${footerHeight}px;
    padding: 5px;
`;
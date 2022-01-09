import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const footerHeight = 50;

export const FooterContainer = styled.div`
    ${ FlexHorizontalCenter }
    justify-content: space-between;
    height: ${footerHeight}px;
    padding: 5px 10px;
    border-top: 1px solid ${({theme}: IThemeProps) => theme.darkerGray};
`;
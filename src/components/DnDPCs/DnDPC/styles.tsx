import styled from 'styled-components';
import { FlexHorizontalCenter, PrimaryFont } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';
import { AngleCorner } from '../../containers/AngleCorner';

export const PCContainer = styled(AngleCorner)<IThemeProps>`
    width: 100%;
    padding: 7px 10px 10px;
    text-align: left;

    .name {
        ${ PrimaryFont }
        color: ${({theme}) => theme.primary};
    }

    .metadata {
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        padding: 5px 0;
    }
`;

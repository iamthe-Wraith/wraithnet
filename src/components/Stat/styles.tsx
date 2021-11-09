import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { Theme } from '../Theme';

export const StatContainer = styled.div<IThemeProps>`
    .label {
        color: ${({theme}) => theme.gray};
    }

    .stat {
        ${ PrimaryFont }
        padding-left: 15px;
        font-size: 28px;
        color: ${({theme}) => theme.highlight1};
    }
`;

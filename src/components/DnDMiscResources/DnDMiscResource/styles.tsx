import styled from 'styled-components';
import { PrimaryFont } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';
import { Button } from '../../Button';

export const DnDMiscResourceContainer = styled(Button)<IThemeProps>`
    display: block;
    width: 100%;
    padding: 1px 5px;

    &:hover,
    &.selected {
        .misc-resource-name {
            color: ${({theme}) => theme.primary};
        }
    }

    .misc-resource-name {
        ${ PrimaryFont }
        width: 100%;
        color: ${({theme}) => theme.light};
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
`

import styled from 'styled-components';
import { FlexHorizontalCenter, PrimaryFont } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';
import { Button } from '../../Button';

export const ListItemContainer = styled(Button)<IThemeProps>`
    width: 100%;
    text-align: left;

    & > * {
        width: 100%;
    }

    .list-item-angle-corner {
        padding: 5px 20px 8px;
    }
`

export const NameContainer = styled.div<IThemeProps>`
    ${ PrimaryFont }
`;

export const TagsContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    padding-top: 8px;

    .list-item-tag {
        margin-right: 5px;
    }
`;
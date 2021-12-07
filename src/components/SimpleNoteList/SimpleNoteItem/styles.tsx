import styled from 'styled-components';
import { FlexHorizontalCenter, NoScrollBar } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';

export const AnchorContainer = styled.div<IThemeProps>`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    &:hover {
        cursor: pointer;
        color: ${({theme}) => theme.highlight1};
    }

    .tags-container {
        ${ FlexHorizontalCenter }
        flex-wrap: wrap;
        margin: 4px 4px 0 0;

        &:last-child {
            margin-right: 0;
        }

        & > * {
          margin: 0 4px 4px 0;
        }
    }
`;

export const ContentContainer = styled.div<IThemeProps>`
    ${ NoScrollBar }
    width: 500px;
    min-height: 600px;
    max-height: 600px;
    padding: 10px;
    overflow: auto;
`;

export const SimpleNoteItemContainer = styled.div<IThemeProps>``;

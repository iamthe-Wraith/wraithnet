import styled from 'styled-components';
import { FlexHorizontalCenter, PrimaryFont } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';
import { Button } from '../../Button';

export const InnerContainer = styled.div`
  ${ FlexHorizontalCenter }
  min-width: 100%;
  justify-content: space-between;
`;

export const ListItemContainer = styled.div<IThemeProps>`
    width: 100%;
    text-align: left;

    &:hover {
      .note-actions-container {
        opacity: 1;
        pointer-events: auto;
      }
    }

    & > * {
        width: 100%;
    }

    .list-item-angle-corner {
        padding: 2px 12px 5px;
    }
`;

export const NameContainer = styled.div<IThemeProps>`
    ${ PrimaryFont }
`;

export const NoteActionsContainer = styled.div`
    ${ FlexHorizontalCenter }
    justify-content: flex-end;
    min-width: 100px;
    max-width: 100px;
    min-height: 100%;
    opacity: 0;
    pointer-events: none;

    button {
      &:hover {
        svg {
          &.with-stroke {
            stroke: ${({theme}) => theme.highlight1};
          }
    
          &.with-fill {
            fill: ${({theme}) => theme.highlight1};
          }
        }
      }
    }

    svg {
      width: 13px;

      &.with-stroke {
        stroke: ${({theme}) => theme.gray};
      }

      &.with-fill {
        fill: ${({theme}) => theme.gray};
      }
    }
`;

export const NoteInfoContainer = styled(Button)`
    display: block;
    min-width: calc(100% - 100px);
    max-width: calc(100% - 100px);
    min-height: 100%;
    padding: 0;
    text-align: left;
`;

export const TagsContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    padding-top: 8px;

    .list-item-tag {
        margin-right: 5px;
    }
`;
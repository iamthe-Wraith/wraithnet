import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const TagContainer = styled.div`
  aligh-items: center;
  border-radius: 30px;
  color: ${({theme}: { theme: ITheme }) => theme.light};
  display: flex;
  font-size: 11px;
  line-height: 1em;
  padding: 2px 10px 4px;

  &.light {
    border: 1px solid ${({theme}: { theme: ITheme }) => theme.light};

    &.highlight {
      background: ${({theme}: { theme: ITheme }) => theme.light}30;
    }

    &.withHover {
      transition: background .2s ease-in-out;

      :hover {
        background: ${({theme}: { theme: ITheme }) => theme.light}30;
        cursor: default;
      }
    }
  }

  &.primary {
    border: 1px solid ${({theme}: { theme: ITheme }) => theme.primary};

    &.highlight {
      background: ${({theme}: { theme: ITheme }) => theme.primary}30;
    }

    &.withHover {
      transition: background .2s ease-in-out;

      :hover {
        background: ${({theme}: { theme: ITheme }) => theme.primary}30;
        cursor: default;
      }
    }
  }

  &.secondary {
      border: 1px solid ${({theme}: { theme: ITheme }) => theme.highlight1};

      &.highlight {
        background: ${({theme}: { theme: ITheme }) => theme.highlight1}30;
      }
  
      &.withHover {
        transition: background .2s ease-in-out;

        :hover {
          background: ${({theme}: { theme: ITheme }) => theme.highlight1}30;
          cursor: default;
        }
      }
  }
`;
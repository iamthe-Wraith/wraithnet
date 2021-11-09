import styled from 'styled-components';
import { Popover } from 'react-tiny-popover';
import { IThemeProps } from '../../styles/themes';

export const ReactTinyPopover = styled(Popover)<IThemeProps>`
    .tiny-popover-anchor {
        &:hover,
        & > *:hover {
            cursor: default;
        }
    }
`;

export const ReactTinyPopoverContent = styled.div<IThemeProps>`
    background: ${({theme}) => theme.dark};

    &.tiny-popover-error {
        border: 1px solid ${({theme}) => theme.error};
    }

    &.tiny-popover-light {
        border: 1px solid ${({theme}) => theme.light};
    }

    &.tiny-popover-primary {
        border: 1px solid ${({theme}) => theme.primary};
    }

    &.tiny-popover-primary-dark {
        border: 1px solid ${({theme}) => theme.primaryDark};
    }

    &.tiny-popover-primary {
        border: 1px solid ${({theme}) => theme.highlight1};
    }
`

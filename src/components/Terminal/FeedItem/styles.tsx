import styled from 'styled-components';

export const FeedItemContainer = styled.div`
    display: flex;
    max-width: 100%;

    &.command .textarea {
        color: ${({theme}) => theme.light};
    }

    &.error .textarea {
        color: ${({theme}) => theme.error};
    }

    &.result .textarea {
        color: ${({theme}) => theme.primary};
    }

    & > div {
        font-size: 14px;
    }

    .ps1 {
        white-space: nowrap;
    }

    .feed-item-body {
        flex-grow: 1;
        max-width: 100%;
        margin-left: 3px;
        border: none;
        overflow-wrap: break-word;
    }
`;
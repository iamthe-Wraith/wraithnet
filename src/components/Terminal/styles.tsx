import styled from 'styled-components';

export const Container = styled.label`
    display: block;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    font-size: 14px;
    background: radial-gradient(ellipse at top left, ${({ theme }) => theme.darkestGray}, ${({ theme }) => theme.dark});
`;

export const FeedItem = styled.div`
    align-items: center;
    display: flex;
    height: 20px;

    &.command {
        color: #fff;
    }

    &.error {
        color: ${({theme}) => theme.error};
    }

    &.result {
        color: ${({theme}) => theme.primary};
    }
`;
import styled from 'styled-components';

export const Container = styled.label`
    display: block;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    font-size: 14px;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;
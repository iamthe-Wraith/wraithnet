import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    flex-direction: column;

    .header {
        max-height: 40px;
    }

    .main {
        flex-grow: 1;
    }

    .footer {
        max-height: 40px;
    }
`;
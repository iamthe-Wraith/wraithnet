import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 10px;

    .header {
        height: 40px;
    }

    .main {
        height: calc(100% - 80px);
        overflow: hidden;
    }

    .footer {
        height: 40px;
    }
`;
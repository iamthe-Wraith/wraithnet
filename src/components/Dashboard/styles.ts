import styled from 'styled-components';
import { headerHeight } from '../Header/styles';
import { footerHeight } from '../Footer/styles';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

export const LeftCol = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    max-width: 200px;
    min-width: 200px;
    padding: 10px;
`;

export const MainCol = styled.div`
    height: 100%;
    max-width: calc(100% - 200px);
    min-width: calc(100% - 200px);
`;

export const MainContainer = styled.div`
    display: flex;
    height: calc(100% - ${headerHeight + footerHeight}px);
    overflow: hidden;
`;
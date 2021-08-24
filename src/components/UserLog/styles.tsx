import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const UserLogContainer = styled.div`
    height: 100%;
`;

export const UserLogEntries = styled.div`
    overflow: auto;
    height: calc(100% - 30px);
`;

export const UserLogHeader = styled.div`
    color: ${({theme}: { theme: ITheme }) => theme.primary};
    display: flex;
    justify-content: space-between;
    height: 30px;
`;
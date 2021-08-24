import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const DateContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 1px;
    width: 200px;

    .date-arrow-button {
        height: 24px;
        width: 24px;
    }
`;

export const NoEntries = styled.div`
    color: ${({theme}: { theme: ITheme}) => theme.gray};
    margin-top: 20px;
`;

export const UserLogContainer = styled.div`
    height: 100%;
`;

export const UserLogEntries = styled.div`
    overflow: auto;
    height: calc(100% - 40px);
`;

export const UserLogHeader = styled.div`
    color: ${({theme}: { theme: ITheme }) => theme.primary};
    display: flex;
    justify-content: space-between;
    height: 40px;
`;
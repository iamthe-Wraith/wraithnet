import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const EntryContainer = styled.div`
    &:first-child {
        margin-top: 10px;
    }
`;

export const EntryContent = styled.div`
    padding: 10px 30px;
`;

export const EntryHeader = styled.div`
    display: flex;
    font-size: 11px;
    justify-content: space-between;

    span {
        color: ${({theme}: { theme: ITheme }) => theme.primary};
    }
`;
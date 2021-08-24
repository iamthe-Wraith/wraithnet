import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const EntryContainer = styled.div`
    border-left: 4px solid ${({theme}: { theme: ITheme }) => theme.primary};
    margin: 8px 0;
    padding: 4px 10px;

    &:first-child {
        margin-top: 10px;
    }
`;

export const EntryContent = styled.div`
    padding-top: 5px;
`;

export const EntryHeader = styled.div`
    display: flex;
    font-size: 11px;
    justify-content: space-between;

    span {
        color: ${({theme}: { theme: ITheme }) => theme.primary};
    }
`;

export const EntryTags = styled.div`
    display: flex;
    padding-top: 8px;

    .userlog-entry-tag {
        margin: 0 3px;
    }
`;
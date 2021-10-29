import styled from 'styled-components';
import { FlexHorizontalCenter, NoScrollBar, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DnDSessionsContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }
    align-items: stretch;
`

export const DnDSessionsListContainer = styled.div`
    position: relative;
    min-width: 200px;
    max-width: 200px;
    margin-right: 30px;
    padding-bottom: 10px;

    .header {
        ${ PrimaryFont }
        margin-bottom: 10px;
        font-size: 18px;
        color: ${({theme}) => theme.primary };
        text-align: center;
    }

    .sessions-list {
        ${ NoScrollBar }
        height: calc(100% - 60px);
        overflow: auto;

        .no-sessions {
            padding-top: 20px;
            color: ${({theme}) => theme.gray};
            text-align: center;
        }
    }

    .sessions-spinner-container {
        position: relative;
        width: 100%;
        height: 40px;
    }

    .footer {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        min-height: 35px;
        max-height: 35px;
    }
`;

export const DnDSessionNoteContainer = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;

    .session-editor {
        min-width: 100%;
    }
`;

export const NewSessionModal = styled.div<IThemeProps>`
    .label {
        font-size: 12px;
        color: ${({theme}) => theme.gray};
    }
`;

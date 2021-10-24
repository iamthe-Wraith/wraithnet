import styled from 'styled-components';
import { AbsoluteCenter, FlexCol, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { AngleCorner } from '../containers/AngleCorner';

export const DnDMiscResourcesContainer = styled.div<IThemeProps>`
    ${ FlexCol }
    align-items: flex-end;
    overflow: hidden;

    .misc-resources-wrapper {
        width: calc(100% - 20px);
        min-height: 100%;
        max-height: 100%;
        position: relative;
    }

    .header {
        ${ PrimaryFont }
        width: 100%;
        margin-bottom: 10px;
        color: ${({theme}) => theme.primary};
        text-align: left;
    }

    .dnd-misc-resources {
        ${ FlexCol }
        align-items: flex-end;
        flex-grow: 1;
        width: 100%;
        max-height: calc(100% - 54px);
        overflow: auto;
    }

    .dnd-misc-resource {
        margin-bottom: 5px;
    }

    .footer {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
    }

    .misc-note-modal-header {
        ${ PrimaryFont }
        min-width: 100%;
        font-size: 24px;    
        color: ${({theme}) => theme.primary};
        text-align: center;
    }

    .note-editor {
        flex-grow: 1;
    }

    .spinner {
        ${ AbsoluteCenter }
    }
`;

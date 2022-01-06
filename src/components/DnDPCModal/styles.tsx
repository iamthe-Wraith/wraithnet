import styled from 'styled-components';
import { FlexCol, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { BaseNoteEditor } from '../BaseNoteEditor';
import { Button } from '../Button';
import { DnDDayPicker } from '../DnDDayPicker';
import { Modal } from '../Modal';

export const DnDPCModalContainer = styled(Modal)<IThemeProps>`
    .pc-upper-ctas-container {
        min-height: 30px;

        & > * {
            padding: 0;
        }
    }

    .main {
        ${ FlexHorizontalCenter }
        flex-grow: 1;
        align-items: stretch;
        max-height: calc(100% - 30px);
        overflow: auto;
    }
`;

export const FieldContainer = styled.div<IThemeProps>`
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
    padding: 0 5px;

    .label {
        color: ${({theme}) => theme.gray};
    }

    .dropdown-anchor {
        width: 100%;
        border: ${({theme}) => `1px solid ${theme.gray}`};
    }

    .error {
        font-size: 12px;
        color: ${({theme}) => theme.error};
    }
`;

export const InventoryContainer = styled.div`
    ${ FlexCol }
    position: relative;
    flex-grow: 1;
    max-width: calc(100% - 20px);
    margin-top: 5px;
    padding-top: 10px;
    border-top: ${({theme}) => `1px solid ${theme.gray}`};

    .header {
        ${ PrimaryFont }
        font-size: 16px;
        color: ${({theme}) => theme.primary};
    }

    .inventory-list {
        flex-grow: 1;
    }
`;

export const LeftCol = styled.div`
    ${ FlexCol }
    min-width: 250px;
    max-width: 250px;

    .dropdown-anchor {
        min-width: 100%;
    }
`;

export const NameContainer = styled.div`
    width: calc(100% - 20px);

    .name-input {
        width: 100%;
    }
`;

export const NoteEditor = styled(BaseNoteEditor)`
    flex-grow: 1;
`;

export const PCBirthdayPicker = styled(DnDDayPicker)`
    min-width: 350px;
    padding: 20px;
    background: ${({theme}) => theme.dark};
`;

export const PickBirthdayButton = styled(Button)`
    &.pick-birthday-btn { // required for overriding Button component styles
        border: ${({theme}) => `1px solid ${theme.gray}`};
        width: 100%;
    
        &:hover:not(:disabled),
        &:focus:not(:disabled) {
            ${({theme}) => `
                background: ${theme.lightGray}40;
                border: 1px solid ${theme.light};
            `}
        }
    }
`;
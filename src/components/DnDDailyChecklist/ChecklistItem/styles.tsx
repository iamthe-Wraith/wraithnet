import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';

export const ChecklistItemContainer = styled.div<IThemeProps>`
    position: relative;
    display: flex;

    &:hover {
        cursor: default;

        .button {
            display: flex;
        }
    }

    & > div:first-child {
        min-width: calc(100% - 20px);
        max-width: calc(100% - 20px);
    }

    & > div:last-child {
        position: absolute;
        top: 0;
        min-width: 20px;
        max-width: 20px;
        margin-left: 5px;
        z-index: 1;
    }

    .text-container {
        ${ FlexHorizontalCenter }
        align-items: flex-start;

        & > div:first-child {
            min-width: 30px;
            padding-top: 1px;
        }

        & > div:last-child {
            flex-grow: 1;
        }
    }

    .text {
        color: ${({theme}) => theme.primary};
    }

    .details {
        padding: 5px 0 0 10px;
        color: ${({theme}) => theme.primaryDark};
    }

    .details-textarea {
        margin: 5px 0;
        padding: 5px;
    }

    .button {
        ${FlexCenter}
        display: none;
        padding: 0;

        &.edit-button {
            padding-bottom: 8px;

            &:hover {
                svg {
                    fill: ${({theme}) => theme.primary};
                }
            }
        }

        &.delete-button:hover {
            svg {
                fill: ${({theme}) => theme.error};
            }
        }

        svg {
            width: 15px;
            height: 15px;
            fill: ${({theme}) => theme.darkGray};
        }
    }

    .edit-ctas-container {
        display: flex;
        justify-content: flex-end;

        button {
            font-size: 12px;
            padding: 2px 5px;
        }
    }
`;
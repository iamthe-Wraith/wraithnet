import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter } from '../../../styles/styles';
import { IThemeProps } from '../../../styles/themes';

export const ChecklistItemContainer = styled.div<IThemeProps>`
    display: flex;

    &:hover {
        .button {
            display: flex;
        }
    }

    & > div:first-child {
        flex-grow: 1;
    }

    & > div:last-child {
        min-width: 20px;
        max-width: 20px;
        margin-left: 5px;
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
`;
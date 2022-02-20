import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';

export const RadioButtonContainer = styled.label`
    input[type="radio"] {
        display: none;

        & + .radio-button {
            border: ${({theme}) => `1px solid ${theme.primary}`};
        }

        &:checked + .radio-button {
            background: ${({theme}) => theme.primary}40;

            &:before {
                content: ' ';
                display: block;
                width: 10px;
                height: 10px;
                background: ${({theme}) => theme.highlight1};
                border-radius: 50%; 
            }
        }
    }

    .radio-button {
        ${ FlexCenter }
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
`;

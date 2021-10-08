import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';

export const Container = styled.div`
    ${ FlexCenter }
    height: 100vh;
    width: 100vw;
    padding: 10px;

    & > div {
        min-width: 100%;
    }

    h1 {
        color: ${({ theme }) => theme.primary};
    }

    .error {
        margin-top: 5px;
        font-size: 14px;
        color: ${({theme}) => theme.error};
        text-align: center;
    }
`;

export const InputWrapper = styled.div`
    .input {
        margin: 10px 0 0;
        
        input {
            text-align: center;
        }
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .button {
        margin-right: 5px;
    }
`;
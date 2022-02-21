import styled from 'styled-components';
import { NoScrollBar } from '../../styles/styles';
import { Modal } from '../Modal';

export const Description = styled.div`
    p {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
`;

export const ErrorMessage = styled.div`
    color: ${({theme}) => theme.error};
`;

export const StoreMagicItemModalContainer = styled(Modal)``;

export const StoreMagicItemModalInner = styled.div`
    ${ NoScrollBar }
    width: 500px;
    max-height: 400px;
    overflow: auto;
`;

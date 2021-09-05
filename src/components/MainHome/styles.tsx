import styled from 'styled-components';
import { FlexCenter } from '../../styles/styles';

export const MainEmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 20px;
    width: 100%;

    & > :first-child {
        ${ FlexCenter }
        flex-grow: 1;
    }
`;
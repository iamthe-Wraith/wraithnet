import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';

export const AppVersionContainer = styled.div`
    ${ PrimaryFont }
    font-size: 12px;
    color: ${({theme}) => theme.darkGray};
`;

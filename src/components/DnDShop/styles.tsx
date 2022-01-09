import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';

export const DnDShopContainer = styled.div`
    .header {
        ${ PrimaryFont }
        margin-bottom: 10px;
        font-size: 18px;
        color: ${({theme}) => theme.primary };
        text-align: center;
    }
`;

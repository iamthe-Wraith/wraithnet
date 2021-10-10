import styled from 'styled-components';
import { AbsoluteCenter } from '../../styles/styles';

export const DnDContainer = styled.div`
    position: relative;
    display: block;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    font-size: 14px;
    overflow: hidden;

    .loading {
        ${ AbsoluteCenter }
    }
`;
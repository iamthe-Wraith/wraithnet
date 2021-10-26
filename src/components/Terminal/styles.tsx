import styled from 'styled-components';
import { NoScrollBar } from '../../styles/styles';

export const Container = styled.label`
    ${ NoScrollBar }
    display: block;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    font-size: 14px;
    overflow: auto;
`;
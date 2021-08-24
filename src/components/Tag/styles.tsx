import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const TagContainer = styled.div`
    aligh-items: center;
    border: 1px solid ${({theme}: { theme: ITheme }) => theme.highlight1};
    border-radius: 30px;
    color: ${({theme}: { theme: ITheme }) => theme.light};
    display: flex;
    font-size: 11px;
    line-height: 1em;
    padding: 4px 10px 2px;
`;
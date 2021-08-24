import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const UserLogContainer = styled.div`
    .header {
        color: ${({theme}: { theme: ITheme }) => theme.primary};
        display: flex;
        justify-content: space-between;
    }
`;
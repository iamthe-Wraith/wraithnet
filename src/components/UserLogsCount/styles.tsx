import styled from 'styled-components';
import { ITheme } from '../../styles/themes';

export const UserLogsCountContainer = styled.div`
    color: ${({theme}: { theme: ITheme }) => theme.primary};
`;
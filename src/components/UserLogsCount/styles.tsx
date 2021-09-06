import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';
import { ITheme, IThemeProps } from '../../styles/themes';

export const Count = styled.div`
    ${ PrimaryFont }
    color: ${({theme}: { theme: ITheme }) => theme.primary};
    font-size: 18px;
    padding-left: 20px;
`;

export const Label = styled.div`
    color: ${({theme}: IThemeProps) => theme.darkGray};
    font-size: 11px;
`;

export const UserLogsCountContainer = styled.div`
    color: ${({theme}: { theme: ITheme }) => theme.darkGray};
    display: flex;
    flex-direction: column;
    max-width: 200px;
    padding: 5px;

    .angle-corner {
        padding: 5px 10px;
    }
`;
import styled from 'styled-components';
import { ITheme, IThemeProps } from '../../styles/themes';

export const DateContainer = styled.div`
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    padding: 0 1px;
    width: 200px;

    .date-arrow-button {
        &:hover {
            svg {
                fill: ${({theme}: IThemeProps) => theme.primary }
            }
        }

        svg {
            height: 24px;
            width: 24px;
            fill: ${({theme}: IThemeProps) => theme.light};
        }
    }
`;

export const NoEntries = styled.div`
    color: ${({theme}: IThemeProps) => theme.gray};
    margin-top: 30px;
    text-align: center;
`;

export const UserLogContainer = styled.div`
    border: 1px solid ${({theme}: IThemeProps) => theme.darkGray};
    height: calc(100% - 10px);
    width: calc(100% - 10px);
`;

export const UserLogEntries = styled.div`
    height: calc(100% - 40px);
    max-width: 50%;
    min-width: 50%;
    overflow: auto;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const UserLogHeader = styled.div`
    align-items: center;
    background: ${({theme}: IThemeProps) => theme.darkestGray};
    border-bottom: 1px solid ${({theme}: IThemeProps) => theme.darkGray};
    color: ${({theme}: IThemeProps) => theme.primary};
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    height: 40px;
    padding: 0 20px;
`;

export const UserLogMain = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 5px;
`;
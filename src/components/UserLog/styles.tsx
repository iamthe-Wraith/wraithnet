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

export const SearchContainer = styled.div`
    & > :first-child {
        display: flex;

        .search {
            flex-grow: 1;
            font-size: 18px;
            margin-right: 10px;
            padding: 10px;
        }

        .search-button {
            font-size: 12px;
            padding: 5px 15px;
        }
    }

    & > :last-child {
        .clear-search-button {
            color: ${({theme}: IThemeProps) => theme.primary};

            :hover {
                color: ${({theme}: IThemeProps) => theme.primaryDark};
            }
        }
    }
`;

export const TagsContainer = styled.div`
    padding: 20px 0 10px 10px;

    .with-any-or-no-tags {
        margin-bottom: 4px;
    }

    .tags-list {
        padding-top: 10px;
    }
`;

export const UserLogContainer = styled.div`
    border: 1px solid ${({theme}: IThemeProps) => theme.darkGray};
    height: calc(100% - 10px);
    width: calc(100% - 10px);
`;

export const UserLogHeader = styled.div`
    align-items: center;
    background: ${({theme}: IThemeProps) => theme.darkerGray};
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

    & > div {
        height: calc(100% - 40px);
    }

    & > :first-child {
        max-width: 60%;
        min-width: 60%;
        overflow: auto;
        
        &::-webkit-scrollbar {
            display: none;
        }
    }

    & > :last-child {
        max-width: 40%;
        min-width: 40%;
        padding: 10px;
    }
`;
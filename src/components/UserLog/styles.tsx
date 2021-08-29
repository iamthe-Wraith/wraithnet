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

export const LoadingSpinnerContainer = styled.div`
    min-height: 50px;
    margin: 10px 0;
    position: relative;
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
    border-bottom: 1px solid ${({theme}: IThemeProps) => theme.gray};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    max-height: 50%;
    padding: 20px 0 0 10px;

    .with-any-or-no-tags {
        margin-bottom: 4px;
    }

    .tags-list {
        flex-grow: 1;
        margin: 10px 0;
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

    .close {
        fill: ${({theme}: IThemeProps) => theme.light};
        padding-top: 4px;

        :hover {
            cursor: default;
            fill: ${({theme}: IThemeProps) => theme.primary};
        }
    }
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
        max-width: calc(100% - 300px);
        min-width: calc(100% - 300px);
        overflow: auto;
        position: relative;
        
        &::-webkit-scrollbar {
            display: none;
        }

        .loading-spinner {
            top: 20%;
        }
    }

    & > :last-child {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        min-width: 300px;
        padding: 10px;
    }
`;

export const WaypointContainer = styled.div`
    min-height: 50px;
    position: relative;
`;
import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const LoadingSpinnerContainer = styled.div`
    min-height: 50px;
    margin: 10px 0;
    position: relative;
`;

export const NoTagsContainer = styled.div`
    ${ FlexCenter }
    color: ${({theme}: IThemeProps) => theme.gray};
    font-size: 12px;
`;

export const TagContainer = styled.div`
    ${ FlexHorizontalCenter }
    :not(:last-child) {
        margin-bottom: 4px;
    }
`;

export const TagsListContainer = styled.div`
    ${ NoScrollBar }
    align-items: flex-start;    
    display: flex;
    flex-direction: column;
    min-height: 100px;
    max-height: 100%;
    overflow: auto;
    position: relative;

    .loading-spinner {
        left: 60px;
    }
`;
import styled from 'styled-components';
import { FlexCenter, FlexCol, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const LoadingSpinnerContainer = styled.div`
    min-height: 50px;
    margin: 10px 0;
    position: relative;
`;

export const NewTagModal = styled.div<IThemeProps>`
    .label {
        font-size: 12px;
        color: ${({theme}) => theme.gray};
    }
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

export const TagsListItems = styled.div`
    ${ NoScrollBar }
    flex-grow: 1;
    max-height: 100%;
    overflow: auto;
`;

export const TagsListContainer = styled.div`
    ${ FlexCol }
    position: relative;    
    align-items: flex-start;    
    min-height: 100px;
    max-height: 100%;
    
    .loading-spinner {
        left: 60px;
    }

    .ctas {
        min-width: 100%;
    }
`;
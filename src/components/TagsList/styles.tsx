import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const NoTagsContainer = styled(FlexCenter)`
    color: ${({theme}: IThemeProps) => theme.gray};
    font-size: 12px;
`;

export const TagContainer = styled(FlexHorizontalCenter)`
    :not(:last-child) {
        margin-bottom: 4px;
    }
`;

export const TagsListContainer = styled.div`
    align-items: flex-start;    
    display: flex;
    flex-direction: column;
`;
import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';

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
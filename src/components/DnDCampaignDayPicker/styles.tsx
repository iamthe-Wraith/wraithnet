import styled from 'styled-components';
import { FlexCol, NoScrollBar } from '../../styles/styles';

export const DnDCampaignDayPickerContainer = styled.div`
    ${ FlexCol }
`;

export const Events = styled.div`
    ${ NoScrollBar }
    flex-grow: 1;
    padding: 5px;
    overflow: auto;
`;
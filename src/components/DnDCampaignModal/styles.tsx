import styled from 'styled-components';
import { AbsoluteCenter, FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';
import { AngleCorner } from '../containers/AngleCorner';
import { Modal } from '../Modal';

export const DnDCampaignModalContainer = styled(Modal)<IThemeProps>`
    .label {
        padding-bottom: 4px;
        font-size: 12px;
    }

    .error {
        font-size: 12px;
        color: ${({theme}) => theme.error};
    }

    .campaign-start-date {
        span {
            color: ${({theme}) => theme.primary};
        }
    }

    .campaign-start-date-container {
        padding: 20px 0;
    }

    .change-start-date {
        padding: 0;
        font-size: 12px;
        color: ${({theme}) => theme.gray};
    }

    .spinner {
        ${ AbsoluteCenter }
    }
`;

export const StartDayContainer = styled(AngleCorner)<IThemeProps>`
    padding: 20px;
`;

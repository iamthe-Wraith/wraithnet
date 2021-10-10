import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { CampaignsContext } from '../../contexts/Campaigns';
import { ICampaign } from '../../models/campaigns';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { Campaign } from './Campaign';
import { CampaignsListContainer } from './styles';

interface IProps extends IThemeProps {
    className: string;
}

const CampaignsListBase: React.FC<IProps> = ({ className = '' }) => {
    const campaigns = useContext(CampaignsContext);

    const renderCampaigns = () => {
        if (campaigns.campaigns.length === 0) {
            return (
                <div>No campaigns found</div>
            )
        }

        const onCampaignClick = (campaign: ICampaign) => () => {
            campaigns.setCampaign(campaign);
        }

        return campaigns.campaigns.map(campaign => {
            return (
                <Campaign
                    campaign={ campaign }
                    key={ campaign.id }
                    onClick={ onCampaignClick(campaign) }
                />
            )
        });
    }

    return (
        <CampaignsListContainer className={ className }>
            { renderCampaigns() }
        </CampaignsListContainer>
    )
}

const CampaignsListAsObserver = observer(CampaignsListBase);
export const CampaignsList = withTheme(CampaignsListAsObserver);

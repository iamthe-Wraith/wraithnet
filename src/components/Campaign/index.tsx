import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { CampaignsContext } from '../../contexts/Campaigns';
import { CampaignContainer } from './styles';

interface IProps {
    className?: string;
}

const CampaignBase: React.FC<IProps> = ({ className = '' }) => {
    const campaigns = useContext(CampaignsContext);
    
    return (
        <CampaignContainer>
            campaign - { campaigns.campaign.name }
        </CampaignContainer>
    )
}

export const Campaign = observer(CampaignBase);
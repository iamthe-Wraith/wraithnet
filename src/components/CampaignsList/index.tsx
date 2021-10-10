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
import { CampaignsContainer, CampaignsListContainer } from './styles';

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
            <div className='top top-2' />
            <div className='top top-1' />
            <div className='side left outer upper' />
            <div className='side left inner upper' />
            <div className='side left outer lower' />
            <div className='side left inner lower' />

            <CampaignsContainer>
                { renderCampaigns() }
            </CampaignsContainer>

            <div className='side right outer upper' />
            <div className='side right inner upper' />
            <div className='side right outer lower' />
            <div className='side right inner lower' />
            <div className='bottom bottom-1' />
            <div className='bottom bottom-2' />
        </CampaignsListContainer>
    )
}

const CampaignsListAsObserver = observer(CampaignsListBase);
export const CampaignsList = withTheme(CampaignsListAsObserver);

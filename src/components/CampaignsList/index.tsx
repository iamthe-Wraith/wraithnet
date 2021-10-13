import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { ICampaign } from '../../models/dnd/types';
import { IThemeProps } from '../../styles/themes';
import { BasicBottom } from '../decorators/bottom/BasicBottom';
import { Left1 } from '../decorators/left/Left1';
import { Right1 } from '../decorators/right/Right1';
import { BasicTop } from '../decorators/top/BasicTop';
import { Campaign } from './Campaign';
import { CampaignsContainer, CampaignsListContainer } from './styles';

interface IProps extends IThemeProps {
    className: string;
}

const CampaignsListBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    const renderCampaigns = () => {
        if (dnd.campaigns.length === 0) {
            return (
                <div>No campaigns found</div>
            )
        }

        const onCampaignClick = (campaign: ICampaign) => () => {
            dnd.setCampaign(campaign);
        }

        return dnd.campaigns.map(campaign => {
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
            <BasicTop />
            <Left1 />

            <CampaignsContainer>
                { renderCampaigns() }
            </CampaignsContainer>

            <Right1 />
            <BasicBottom />
        </CampaignsListContainer>
    )
}

const CampaignsListAsObserver = observer(CampaignsListBase);
export const CampaignsList = withTheme(CampaignsListAsObserver);

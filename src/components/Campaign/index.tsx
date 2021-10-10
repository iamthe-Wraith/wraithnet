import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { CampaignsContext } from '../../contexts/Campaigns';
import { CampaignContainer, Footer, Main } from './styles';

interface IProps {
    className?: string;
}

const CampaignBase: React.FC<IProps> = ({ className = '' }) => {
    const campaigns = useContext(CampaignsContext);

    useEffect(() => {
        campaigns.campaign.dailyChecklist.load()
            .catch (err => {
                console.error('>>>>> error getting daily checklist: ', err);
            });
    }, []);
    
    return (
        <CampaignContainer className={ className }>
            <Main>
                <div>
                    campaign - { campaigns.campaign.name }
                </div>
                <div></div>
                <div></div>
            </Main>
            <Footer>
                footer
            </Footer>
        </CampaignContainer>
    )
}

export const Campaign = observer(CampaignBase);
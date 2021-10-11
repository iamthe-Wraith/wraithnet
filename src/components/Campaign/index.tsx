import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { DnDIpcRenderer } from '../../models/ipcRenderers/dnd';
import { DnDDailyChecklist } from '../DnDDailyChecklist';
import { Header } from '../Header';
import { CampaignContainer, Footer, HeaderLeftContent, Main } from './styles';

interface IProps {
    className?: string;
}

const CampaignBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    useEffect(() => {
        dnd.campaign.dailyChecklist.load()
            .catch (err => {
                console.error('>>>>> error getting daily checklist: ', err);
            });
    }, []);
    
    const renderHeaderLeftContent = () => {
        return (
            <HeaderLeftContent>
                <div className='campaign-id'>{ dnd.campaign.id }</div>
                <div>current date: xxx</div>
            </HeaderLeftContent>
        );
    }

    return (
        <CampaignContainer className={ className }>
            <Header
                centerContent={ dnd.campaign.name }
                leftContent={ renderHeaderLeftContent() }
                onClose={ DnDIpcRenderer.close }
            />
            <Main>
                <div className='side-col left-col'>
                    <div>left</div>
                    <div>left</div>
                </div>
                <div className='primary-display'>
                    campaign - { dnd.campaign.name }
                </div>
                <div className='side-col right-col'>
                    <div>right</div>
                    <DnDDailyChecklist className='daily-checklist' />
                </div>
            </Main>
            <Footer>
                footer
            </Footer>
        </CampaignContainer>
    )
}

export const Campaign = observer(CampaignBase);
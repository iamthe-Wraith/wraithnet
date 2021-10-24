import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { DnDDate } from '../../lib/dndDate';
import { DnDIpcRenderer } from '../../models/ipcRenderers/dnd';
import { Button, ButtonType } from '../Button';
import { DnDDailyChecklist } from '../DnDDailyChecklist';
import { DnDDayPicker } from '../DnDDayPicker';
import { DnDMiscResources } from '../DnDMiscResources';
import { DnDPCs } from '../DnDPCs';
import { Dots } from '../Dots';
import { Editor } from '../Editor';
import { Header } from '../Header';
import { PrevArrowIcon } from '../svgs/icons/PrevArrowIcon';
import { CampaignContainer, Footer, HeaderLeftContent, Main } from './styles';

interface IProps {
    className?: string;
}

const CampaignBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);
    const [editorContent, setEditorContent] = useState('');

    const onBackClick = () => {
        dnd.setCampaign(null);
    }

    const onDayClick = (day: DnDDate) => {
        console.log('day change: ', day);
    }

    const renderHeaderLeftContent = () => {
        return (
            <HeaderLeftContent>
                <Button
                    className='back-button'
                    buttonType={ ButtonType.BlankReverse }
                    onClick={ onBackClick }
                >
                    <PrevArrowIcon />
                    <span>back</span>
                </Button>
                <div className='campaign-id'>{ dnd.campaign.id }</div>
                <div>{ dnd.campaign.currentDate.stringify() }</div>
            </HeaderLeftContent>
        );
    };

    const renderPrimaryDisplay = () => {
        if (!!editorContent) {
            return <Editor content={ editorContent } />
        }

        return <Dots className='dots' height='150px' />
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
                    <DnDDayPicker
                        className='day-picker'
                        onDayClick={ onDayClick }
                        selectedDay={ dnd.campaign.currentDate.stringify() }
                    />
                    <DnDPCs className='pcs' />
                </div>
                <div className='primary-display'>
                    { renderPrimaryDisplay() }
                </div>
                <div className='side-col right-col'>
                    <DnDMiscResources className='misc-resources' />
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
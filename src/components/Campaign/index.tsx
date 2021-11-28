import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { DnDContext } from '../../contexts/DnD';
import { ImagesContext } from '../../contexts/Images';
import { DnDDate } from '../../lib/dndDate';
import { DnDIpcRenderer } from '../../models/ipcRenderers/dnd';
import { Button, ButtonType } from '../Button';
import { DnDCampaignRouter } from '../DnDCampaignRouter';
import { DnDDailyChecklist } from '../DnDDailyChecklist';
import { DnDDayPicker } from '../DnDDayPicker';
import { DnDMiscResources } from '../DnDMiscResources';
import { DnDNav } from '../DnDNav';
import { DnDPCs } from '../DnDPCs';
import { Header } from '../Header';
import { ImagesModal } from '../ImagesModal';
import { PrevArrowIcon } from '../svgs/icons/PrevArrowIcon';
import { CampaignContainer, Footer, HeaderLeftContent, Main } from './styles';

interface IProps {
  className?: string;
}

const CampaignBase: React.FC<IProps> = ({ className = '' }) => {
  const dnd = useContext(DnDContext);
  const imagesModel = useContext(ImagesContext);
  const history = useHistory();

  const onBackClick = () => {        
    dnd.setCampaign(null);
    history.replace('/');
  };

  const onDayClick = (day: DnDDate) => {
    console.log('day change: ', day);
  };

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

  return (
    <CampaignContainer className={ className }>
      <Header
        centerContent={ dnd.campaign.name }
        leftContent={ renderHeaderLeftContent() }
        onClose={ DnDIpcRenderer.close }
        rightContent={ <DnDNav /> }
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
          <DnDCampaignRouter />
        </div>
        <div className='side-col right-col'>
          <DnDMiscResources className='misc-resources' />
          <DnDDailyChecklist className='daily-checklist' />
        </div>
      </Main>
      <Footer>
                footer
      </Footer>
      {
        imagesModel.modalIsOpen && (
          <ImagesModal
            header='Images'
            onClose={ imagesModel.hideModal }
            isOpen={ imagesModel.modalIsOpen }
          />
        )
      }
    </CampaignContainer>
  );
};

export const Campaign = observer(CampaignBase);
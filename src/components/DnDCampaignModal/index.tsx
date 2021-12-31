import { observer } from 'mobx-react';
import React, { ChangeEvent, useContext, useState } from 'react';
import { withTheme } from 'styled-components';
import { DnDContext } from '../../contexts/DnD';
import { DnDDate } from '../../lib/dndDate';
import { ICampaign } from '../../models/dnd/types';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { CTAs } from '../CtasContainer';
import { DnDDayPicker } from '../DnDDayPicker';
import { LoadingSpinner, SpinnerType } from '../LoadingSpinner';
import { TextInput } from '../TextInput';
import { TinyPopover } from '../TinyPopover';

import { DnDCampaignModalContainer, StartDayContainer } from './styles';

interface IProps extends IThemeProps {
  className?: string;
  campaign?: ICampaign;
  isOpen?: boolean;
  onClose:() => void;
}

export const DnDCampaignModalBase: React.FC<IProps> = ({ campaign, className = '', isOpen, onClose, theme }) => {
  const dnd = useContext(DnDContext);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new DnDDate());
  const [tempStartDate, setTempStartDate] = useState<DnDDate>(new DnDDate());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [nameError, setNameError] = useState('');

  const onCancelClick = () => {
    onClose();
  };

  const onCreateClick = () => {
    if (!name) {
      setNameError('a campaign name is required');
      return;
    }

    dnd.createCampaign(name, startDate)
      .then(onClose)
      .catch(err => {
        console.error('error creating new campaign: ', err);
      });
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameError('');
    setName(e.target.value);
  };

  const onStartDateSetClick = () => {
    setStartDate(new DnDDate(tempStartDate.stringify()));
    setShowStartDatePicker(false);
  };

  const onStartDateCancelClick = () => {
    setTempStartDate(new DnDDate(startDate.stringify()));
    setShowStartDatePicker(false);
  };

  const onStarteDateChangeClick = () => {
    setShowStartDatePicker(true);
  };

  const renderChangeStartDayAnchor = () => {
    return (
      <Button
        buttonType={ ButtonType.BlankReverse }
        className='change-start-date'
        onClick={ onStarteDateChangeClick }
      >
                change
      </Button>
    );
  };

  return (
    <DnDCampaignModalContainer
      className={ className }
      isOpen={ isOpen }
      header={ `${!!campaign ? 'Edit' : 'Create'} Campaign` }
      onClose={ onClose }
    >
      <div>
        <div className='label'>Campaign Name</div>
        <TextInput
          inputId='campaign-name-input'
          value={ name }
          onChange={ onNameChange }
        />
        {
          !!nameError && <div className='error'>{ nameError }</div>
        }
      </div>
      <div className='campaign-start-date-container'>
        <div className='campaign-start-date'>The Adventure Begins on <span>{ startDate.stringify() }</span></div>
        <TinyPopover
          dismissOnOutsideAction
          anchor={ renderChangeStartDayAnchor() }
          isOpen={ showStartDatePicker }
        >
          <StartDayContainer
            borderColor={ theme.primary }
            borderWidth={ 1 }
            className='start-day-picker-container'
            config={ [{ size: AngleSize.Small, position: AnglePos.TopRight }] }
          >
            <DnDDayPicker
              allowYearEdit
              selectedDay={ tempStartDate.stringify() }
              onDayClick={ day => setTempStartDate(day) }
            />
            <CTAs
              ctas={ [
                {
                  text: 'set',
                  type: ButtonType.Primary,
                  onClick: onStartDateSetClick,
                },
                {
                  text: 'cancel',
                  type: ButtonType.BlankReverse,
                  onClick: onStartDateCancelClick,
                },
              ] }
            />
          </StartDayContainer>
        </TinyPopover>
      </div>
      <CTAs
        ctas={ [
          {
            text: 'save',
            type: ButtonType.Primary,
            onClick: onCreateClick,
          },
          {
            text: 'cancel',
            type: ButtonType.BlankReverse,
            onClick: onCancelClick,
          },
        ] }
      />
      {
        dnd.creating && (
          <LoadingSpinner
            className='spinner'
            type={ SpinnerType.Random }
          />
        )
      }
    </DnDCampaignModalContainer>
  );
};

const DnDCampaignModalAsObserver = observer(DnDCampaignModalBase);
export const DnDCampaignModal = withTheme(DnDCampaignModalAsObserver);

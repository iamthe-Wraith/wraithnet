import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { DnDDate } from '../../lib/dndDate';
import { DnDDayPicker } from '../DnDDayPicker';
import { DnDCampaignDayPickerContainer, Events } from './styles';

interface IProps {
    className?: string;
}

export const DnDCampaignDayPicker: React.FC<IProps> = ({
    className = '',
}) => {
    const errorMessages = useContext(ErrorMessagesContext);
    const dnd = useContext(DnDContext);
    const [selectedDate, setSelectedDate] = useState(dnd.campaign.currentDate);

    useEffect(() => {
        dnd.campaign.getEvents(selectedDate)
            .catch(err => {
                errorMessages.push({ message: err.message });
            });
    }, [selectedDate]);

    const onDayClick = useCallback((day: DnDDate) => {
        setSelectedDate(day);
    }, [selectedDate]);
    
    const renderEvents = () => {
        return 'events...';
    };

    return (
        <DnDCampaignDayPickerContainer className={ className }>
            <DnDDayPicker
                className='day-picker'
                onDayClick={ onDayClick }
                defaultSelectedDay={ selectedDate.stringify() }
            />
            <Events>
                { renderEvents() }
            </Events>
        </DnDCampaignDayPickerContainer>
    );
};

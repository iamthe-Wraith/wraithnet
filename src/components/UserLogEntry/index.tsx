import dayjs from 'dayjs';
import React from 'react';
import { UserLogEntryModel } from '../../models/userLogs';

import { EntryContainer, EntryContent, EntryHeader } from './styles';

interface IProps {
    className?: string;
    entry: UserLogEntryModel;
}

export const UserLogEntry: React.FC<IProps> = ({ className = '', entry }) => {
    return (
        <EntryContainer className={ className }>
            <EntryHeader>
                <span>{ dayjs(entry.createdAt).format('h:mm A') }</span>
                <span>{ entry.id }</span>
            </EntryHeader>
            <EntryContent>
                { entry.content }
            </EntryContent>
        </EntryContainer>
    )
};
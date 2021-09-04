import dayjs from 'dayjs';
import React from 'react';
import { UserLogEntryModel } from '../../models/userLogs';
import { Tag } from '../Tag';

import { EntryContainer, EntryContent, EntryHeader, EntryTags } from './styles';

interface IProps {
    className?: string;
    entry: UserLogEntryModel;
}

export const UserLogEntry: React.FC<IProps> = ({ className = '', entry }) => {
    const renderTags = () => {
        return entry.tags.map((tag, i) => {
            return (
                <Tag
                    key={ tag.id }
                    className='userlog-entry-tag'
                    text={ tag.text }
                />
            )
        });
    }

    return (
        <EntryContainer className={ className }>
            <EntryHeader>
                <span>{ dayjs(entry.createdAt).format('h:mm A') }</span>
                <span>{ entry.id }</span>
            </EntryHeader>
            <EntryContent>
                { entry.content }
            </EntryContent>
            {
                entry.tags.length > 0 && (
                    <EntryTags>
                        { renderTags() }
                    </EntryTags>
                )
            }
        </EntryContainer>
    )
};
import dayjs from 'dayjs';
import React from 'react';
import { withTheme } from 'styled-components';
import { UserLogEntryModel } from '../../models/userLogs';
import { IThemeProps } from '../../styles/themes';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';
import { Tag } from '../Tag';

import { EntryContainer, EntryContent, EntryHeader, EntryTags } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    entry: UserLogEntryModel;
}

const UserLogEntryBase: React.FC<IProps> = ({ className = '', entry, theme }) => {
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
            <AngleCorner
                backgroundColor={ theme.darkestGray }
                className='angle-corner'
                config={[{ position: AnglePos.BottomRight, size: AngleSize.Tiny }]}
            >
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
            </AngleCorner>
        </EntryContainer>
    )
};

export const UserLogEntry = withTheme(UserLogEntryBase);
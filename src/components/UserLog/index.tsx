import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagModel } from '../../models/tags';
import { IEntryQueryOptions, UserLogsModel } from '../../models/userLogs';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { NextArrowIcon } from '../icons/NextArrowIcon';
import { PrevArrowIcon } from '../icons/PrevArrowIcon';
import { Tag, TagType } from '../Tag';
import { TagsList } from '../TagsList';
import { TextInput } from '../TextInput';
import { UserLogEntry } from '../UserLogEntry';

import {
    DateContainer,
    NoEntries,
    SearchContainer,
    TagsContainer,
    UserLogContainer,
    UserLogHeader,
    UserLogMain,
} from './styles';

interface IProps {
    className?: string;
}

enum DateChangeDirection {
    Next = 'next',
    Prev = 'prev',
}

const UserLogBase: FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [selectedDate, setSelectedDate] = useState(dayjs().local());
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([])
    const [withAnyTag, setWithAnyTag] = useState(false);
    const [withNoTag, setWithNoTag] = useState(false);
    const [search, setSearch] = useState('');

    const onUserLogUpdate = () => {
        if (selectedDate.isSame(dayjs().local(), 'date')) {
            userLogsModel.getEntries(true);
        }
    };

    useEffect(() => {
        window.addEventListener('userlog-update', onUserLogUpdate);
        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, []);

    useEffect(() => {
        userLogsModel.setCriteria({
            anyTags: withAnyTag,
            created: selectedDate.format(),
            noTags: withNoTag,
            tags: selectedTags
        });
    }, [selectedDate, selectedTags, withAnyTag, withNoTag]);

    const onClearSearchClick = useCallback(() => {
        () => {
            userLogsModel.setCriteria({ created: selectedDate.format() });
            setSearch('');
        }
    }, [userLogsModel.criteria, selectedDate]);

    const onDateChangeClick = (direction: DateChangeDirection) => () => {
        setSelectedDate(selectedDate[direction === DateChangeDirection.Next ? 'add' : 'subtract'](1, 'day'));
    }

    const onFilterTagChange = (newTags: TagModel[]) => {
        // disable withAnyTag and withNoTag flags if a new tag has been added to list
        if (newTags.length > selectedTags.length) {
            if (withAnyTag) setWithAnyTag(false);
            if (withNoTag) setWithNoTag(false);
        }

        setSelectedTags(newTags);
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSearchClick = () => {
        if (search) {
            userLogsModel.setCriteria({ text: search });
        }
    };

    const onSearchKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                onSearchClick();
                break;
            default:
                break;
        }
    }

    const onWithAnyTagChange = () => {
        const isChecked = !withAnyTag;

        setWithAnyTag(isChecked);
        
        if (isChecked) {
            if (withNoTag) setWithNoTag(false);
            if (selectedTags.length) setSelectedTags([]);
        }
    }

    const onWithNoTagChange = () => {
        const isChecked = !withNoTag;

        setWithNoTag(isChecked);

        if (isChecked) {
            if (withAnyTag) setWithAnyTag(false);
            if (selectedTags.length) setSelectedTags([]);
        }
    }
 
    const renderEntries = () => {
        if (userLogsModel.entries.length === 0) {
            return (
                <NoEntries>
                    No entries found
                </NoEntries>
            );
        }

        return userLogsModel.entries.map(entry => <UserLogEntry key={ entry.id } entry={ entry } />);
    }

    return (
        <UserLogContainer className={ className }>
            <UserLogHeader>
                <DateContainer>
                    <Button
                        className='date-arrow-button'
                        onClick={ onDateChangeClick(DateChangeDirection.Prev) }
                        type={ ButtonType.Blank }
                    >
                        <PrevArrowIcon />
                    </Button>
                    <span>{ selectedDate.format('MMM DD, YYYY') }</span>
                    <Button
                        className='date-arrow-button'
                        onClick={ onDateChangeClick(DateChangeDirection.Next) }
                        type={ ButtonType.Blank }
                    >
                        <NextArrowIcon />
                    </Button>
                </DateContainer>
                <span>entries: { userLogsModel.count }</span>
                <Link to='/'>close</Link>
            </UserLogHeader>
            <UserLogMain>
                <div>
                    { renderEntries() }
                </div>
                <div>
                    <SearchContainer>
                        <div>
                            <TextInput
                                className='search'
                                inputId='userlog-search'
                                onChange={ onSearchChange }
                                onKeyDown={ onSearchKeyDown }
                                placeholder='Search'
                                value={ search }
                            />
                            <Button
                                className='search-button'
                                onClick={ onSearchClick }
                                type={ ButtonType.PrimaryReverse }
                            >
                                Search
                            </Button>
                        </div>
                        {
                            !!search && (
                                <div>
                                    <Button
                                        className='clear-search-button'
                                        onClick={ onClearSearchClick }
                                        type={ ButtonType.Blank }
                                    >
                                        Clear search
                                    </Button>
                                </div>
                            )
                        }
                    </SearchContainer>
                    <TagsContainer>
                        <Checkbox
                            checked={ withAnyTag }
                            className='with-any-or-no-tags'
                            id='entry-with-any-tag-checkbox'
                            label={ (
                                <Tag
                                    allowHoverHighlight={ true }
                                    isHighlighted={ withAnyTag }
                                    text='with any tag'
                                    type={ TagType.Light }
                                />
                            ) }
                            onChange={ onWithAnyTagChange }
                        />
                        <Checkbox
                            checked={ withNoTag }
                            className='with-any-or-no-tags'
                            id='entry-with-no-tag-checkbox'
                            label={ (
                                <Tag
                                    allowHoverHighlight={ true }
                                    isHighlighted={ withNoTag }
                                    text='with no tags'
                                    type={ TagType.Light }
                                />
                            ) }
                            onChange={ onWithNoTagChange }
                        />
                        <TagsList
                            className='tags-list'
                            forceClearSelectedList={ withAnyTag || withNoTag }
                            onSelectedTagsChange={ onFilterTagChange }
                        />
                    </TagsContainer>
                </div>
            </UserLogMain>
        </UserLogContainer>
    )
};

export const UserLog = observer(UserLogBase);
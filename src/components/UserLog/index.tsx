import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { withTheme } from 'styled-components';
import { TagModel } from '../../models/tags';
import { UserLogsModel } from '../../models/userLogs';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { NextArrowIcon } from '../icons/NextArrowIcon';
import { PrevArrowIcon } from '../icons/PrevArrowIcon';
import { XIcon } from '../icons/XIcon';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Spinner } from '../LoadingSpinner/styles';
import { Tag, TagType } from '../Tag';
import { TagsList } from '../TagsList';
import { TextInput } from '../TextInput';
import { Theme } from '../Theme';
import { UserLogEntry } from '../UserLogEntry';

import {
    DateContainer,
    LoadingSpinnerContainer,
    NoEntries,
    SearchContainer,
    TagsContainer,
    UserLogContainer,
    UserLogHeader,
    UserLogMain,
    WaypointContainer,
} from './styles';

interface IProps extends IThemeProps {
    className?: string;
}

enum DateChangeDirection {
    Next = 'next',
    Prev = 'prev',
}

const UserLogBase: FC<IProps> = ({ className = '', theme }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [selectedDate, setSelectedDate] = useState(dayjs().local());
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([])
    const [withAnyTag, setWithAnyTag] = useState(false);
    const [withNoTag, setWithNoTag] = useState(false);
    const [search, setSearch] = useState('');
    const timeout = useRef<number>(null);

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

    useEffect(() => {
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => {
            userLogsModel.setCriteria({ text: search });
        }, 400);
    }, [search]);

    const loadMore = () => {
        userLogsModel.getEntries();
    }

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
        if (userLogsModel.isLoaded && userLogsModel.entries.length === 0) {
            return (
                <NoEntries>
                    No entries found
                </NoEntries>
            );
        }

        const entries = userLogsModel.entries.map(entry => <UserLogEntry key={ entry.id } entry={ entry } />);

        if (userLogsModel.isBusy) {
            const spinner = (
                <LoadingSpinner
                    className={ userLogsModel.isLoaded ? '' : 'loading-spinner' }
                    key='loading-spinner'
                    size={ SpinnerSize.Small }
                    type={ SpinnerType.One }
                />
            );

            if (userLogsModel.isLoaded) {
                entries.push((
                    <LoadingSpinnerContainer key='loading-spinner-container'>
                        { spinner }
                    </LoadingSpinnerContainer>
                ))
            } else {
                entries.push(spinner);
            }
        }

        if (!userLogsModel.allEntriesLoaded && !userLogsModel.isBusy && userLogsModel.isLoaded) {
            return [...entries, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 100 } />];
        }

        return entries;
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
                <Link to='/' className='close'>
                    <XIcon fill='none' />
                </Link>
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
                                placeholder='Search'
                                value={ search }
                            />
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
                    <TagsContainer className='tags-container'>
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

const UserLogAsObserver = observer(UserLogBase);
export const UserLog = withTheme(UserLogAsObserver);
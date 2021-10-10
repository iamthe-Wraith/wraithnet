import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { RangeModifier } from 'react-day-picker';
import { TagModel } from '../../models/tags';
import { IEntryQueryOptions, UserLogsModel } from '../../models/userLogs';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { XIcon } from '../svgs/icons/XIcon';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Tag, TagType } from '../Tag';
import { TagsList } from '../TagsList';
import { DayPicker } from '../DayPicker';
import { TextInput } from '../TextInput';
import { UserLogEntry } from '../UserLogEntry';

import {
    DateContainer,
    DayPickerContainer,
    LoadingSpinnerContainer,
    NoEntries,
    SearchContainer,
    TagsContainer,
    UserLogContainer,
    UserLogHeader,
    UserLogMain,
} from './styles';

interface IProps extends IThemeProps {
    className?: string;
}

const UserLogBase: FC<IProps> = ({ className = '' }) => {
    const userLogsModel = useRef(new UserLogsModel()).current;
    const [dateRange, setDateRange] = useState<RangeModifier>({ from: dayjs().local().toDate(), to: null });
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([])
    const [withAnyTag, setWithAnyTag] = useState(false);
    const [withNoTag, setWithNoTag] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(true);
    const [search, setSearch] = useState('');
    const timeout = useRef<number>(null);
    const today = useRef(new Date()).current;

    const onUserLogUpdate = useCallback(() => {
        const now = dayjs().local();
        const from = dayjs(dateRange.from);
        const to = dayjs(dateRange.to);
        
        if (from.isSame(now, 'date') || to.isSame(now, 'date')) userLogsModel.getEntries(true);
    }, [dateRange, userLogsModel]);

    useEffect(() => {
        window.removeEventListener('userlog-update', onUserLogUpdate);
        window.addEventListener('userlog-update', onUserLogUpdate);
        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, [dateRange]);

    useEffect(() => {
        let opts: IEntryQueryOptions = {
            anyTags: withAnyTag,
            noTags: withNoTag,
            tags: selectedTags
        };

        if (!!dateRange.from && !!dateRange.to) {
            opts = {
                ...opts,
                created: null,
                createdAfter: dayjs(dateRange.from).format(),
                createdBefore: dayjs(dateRange.to).format(),
            }
        } else {
            opts = {
                ...opts,
                created: dayjs(dateRange.from).format(),
                createdAfter: null,
                createdBefore: null,
            }
        }
        
        userLogsModel.setCriteria(opts);
    }, [dateRange, selectedTags, withAnyTag, withNoTag]);

    useEffect(() => {
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => {
            userLogsModel.setCriteria({ text: search });
        }, 400);
    }, [search]);

    const getSelectedDatesAsString = () => {
        const format = 'MMM DD, YYYY';
        if (!!dateRange.from && !!dateRange.to) {
            const from = dayjs(dateRange.from);
            const to = dayjs(dateRange.to);
            return from.isSame(to)
                ? dayjs(dateRange.from).format(format)
                : `${dayjs(dateRange.from).format(format)} - ${dayjs(dateRange.to).format(format)}`;
        }

        if (dateRange.from) return dayjs(dateRange.from).format(format);
        if (dateRange.to) return dayjs(dateRange.to).format(format);

        return '--';
    }

    const loadMore = useCallback(() => {
        userLogsModel.getEntries();
    }, [userLogsModel]);

    const onClearSearchClick = useCallback(() => {
        () => {
            userLogsModel.setCriteria({ text: null });
            setSearch('');
        }
    }, [userLogsModel.criteria]);

    const onFilterTagChange = useCallback((newTags: TagModel[]) => {
        // disable withAnyTag and withNoTag flags if a new tag has been added to list
        if (newTags.length > selectedTags.length) {
            if (withAnyTag) setWithAnyTag(false);
            if (withNoTag) setWithNoTag(false);
        }

        setSelectedTags(newTags);
    }, [selectedTags, withAnyTag, withNoTag]);

    const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const onWithAnyTagChange = useCallback(() => {
        const isChecked = !withAnyTag;

        setWithAnyTag(isChecked);
        
        if (isChecked) {
            if (withNoTag) setWithNoTag(false);
            if (selectedTags.length) setSelectedTags([]);
        }
    }, [withAnyTag, withNoTag, selectedTags]);

    const onWillChangeToNextMonth = useCallback((_: React.MouseEvent<HTMLElement>, nextMonth?: Date) => {
        const now = dayjs();
        const next = dayjs(nextMonth).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);

        if (next.isAfter(now) || now.month() === next.month()) {
            setDisableNextButton(true);
        }
    }, []);

    const onWillChangeToPreviousMonth = useCallback((_: React.MouseEvent<HTMLElement>, prevMonth?: Date) => {
        const now = dayjs();
        const prev = dayjs(prevMonth);

        if (prev.isBefore(now, 'month')) {
            setDisableNextButton(false);
        }
    }, []);

    const onWithNoTagChange = useCallback(() => {
        const isChecked = !withNoTag;

        setWithNoTag(isChecked);

        if (isChecked) {
            if (withAnyTag) setWithAnyTag(false);
            if (selectedTags.length) setSelectedTags([]);
        }
    }, [withNoTag, withAnyTag, selectedTags]);

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
                    <span>{ getSelectedDatesAsString() }</span>
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
                                        buttonType={ ButtonType.Blank }
                                    >
                                        Clear search
                                    </Button>
                                </div>
                            )
                        }
                    </SearchContainer>
                    <DayPickerContainer>
                        <DayPicker
                            defaultDateRange={ dateRange }
                            disabledDays={ [{ after: today }] }
                            disableNextButton={ disableNextButton }
                            onDateRangeChange={ setDateRange }
                            onWillChangeToNextMonth={ onWillChangeToNextMonth }
                            onWillChangeToPreviousMonth={ onWillChangeToPreviousMonth }
                            selectedDays={ [dateRange.from, { from: dateRange.from, to: dateRange.to }] }
                            showReset={ true }
                        />
                    </DayPickerContainer>
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

export const UserLog = observer(UserLogBase);
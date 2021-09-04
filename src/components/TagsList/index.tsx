import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { TagModel, TagsModel } from '../../models/tags';
import { Checkbox } from '../Checkbox';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Tag, TagType } from '../Tag';
import { LoadingSpinnerContainer, NoTagsContainer, TagContainer, TagsListContainer } from './styles';

interface IProps {
    className?: string;
    forceClearSelectedList?: boolean;
    onSelectedTagsChange?: (selectedTags: TagModel[]) => void;
}

const TagsListBase: FC<IProps> = ({ className, forceClearSelectedList, onSelectedTagsChange }) => {
    const tagsModel = useRef(new TagsModel()).current;
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    const onUserLogUpdate = () => {
        tagsModel.getTags(true);
    };

    useEffect(() => {
        tagsModel.getTags();
        window.removeEventListener('userlog-update', onUserLogUpdate);
        window.addEventListener('userlog-update', onUserLogUpdate);
        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, [tagsModel]);

    useEffect(() => {
        if (forceClearSelectedList) {
            setSelectedTags([]);
        }
    }, [forceClearSelectedList]);

    useEffect(() => {
        onSelectedTagsChange?.(selectedTags);
    }, [selectedTags]);

    const loadMore = () => {
        tagsModel.getTags();
    };

    const onTagChange = (tag: TagModel) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const isSelected = selectedTags.find(selectedTag => selectedTag.id === tag.id);

        if (isSelected) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const renderTags = () => {
        if (tagsModel.isLoaded && tagsModel.tags.length === 0) {
            return (
                <NoTagsContainer>
                    No tags found
                </NoTagsContainer>
            )
        }

        const tags = tagsModel.tags.map(t => {
            const isChecked = !!selectedTags.find(selectedTag => selectedTag.id === t.id);
            const tag = (
                <Tag
                    allowHoverHighlight={ !!onSelectedTagsChange }
                    isHighlighted={ isChecked }
                    text={ t.text }
                    type={ isChecked ? TagType.Secondary : TagType.Primary }
                />
            )

            return (
                <TagContainer key={ t.text }>
                    {
                        !!onSelectedTagsChange
                            ? (
                                <Checkbox
                                    checked={ isChecked }
                                    id={ `taglist-${t.id}` }
                                    label={ tag }
                                    onChange={ onTagChange(t) }
                                />
                            )
                            : tag
                    }
                </TagContainer>
            )
        });

        if (tagsModel.isBusy) {
            const spinner = (
                <LoadingSpinner
                    className={ tagsModel.isLoaded ? '' : 'loading-spinner' }
                    key='loading-spinner'
                    size={ SpinnerSize.Small }
                    type={ SpinnerType.Two }
                />
            );

            if (tagsModel.isLoaded) {
                tags.push((
                    <LoadingSpinnerContainer key='loading-spinner-container'>
                        { spinner }
                    </LoadingSpinnerContainer>
                ))
            } else {
                tags.push(spinner);
            }
        }

        if (!tagsModel.allTagsLoaded && !tagsModel.isBusy && tagsModel.isLoaded) {
            return [...tags, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 700 } />];
        }

        return tags
    }

    return (
        <TagsListContainer className={ className }>
            { renderTags() }
        </TagsListContainer>
    )
};

export const TagsList = observer(TagsListBase);

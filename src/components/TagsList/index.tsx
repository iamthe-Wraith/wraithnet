import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TagModel, TagsModel } from '../../models/tags';
import { Checkbox } from '../Checkbox';
import { Tag, TagType } from '../Tag';
import { NoTagsContainer, TagContainer, TagsListContainer } from './styles';

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
        window.addEventListener('userlog-update', onUserLogUpdate);
        return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    }, []);

    useEffect(() => {
        if (forceClearSelectedList) {
            setSelectedTags([]);
        }
    }, [forceClearSelectedList]);

    useEffect(() => {
        onSelectedTagsChange?.(selectedTags);
    }, [selectedTags]);

    const onTagChange = (tag: TagModel) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const isSelected = selectedTags.find(selectedTag => selectedTag.id === tag.id);

        if (isSelected) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const renderTags = () => {
        if (tagsModel.tags.length === 0) {
            return (
                <NoTagsContainer>
                    No tags found
                </NoTagsContainer>
            )
        }

        return tagsModel.tags.map(t => {
            const isChecked = !!selectedTags.find(selectedTag => selectedTag.id === t.id);
            const tag = (
                <Tag
                    allowHoverHighlight={ !!onSelectedTagsChange }
                    isHighlighted={ isChecked }
                    text={ t.text }
                    type={ TagType.Secondary }
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
    }

    return (
        <TagsListContainer className={ className }>
            { renderTags() }
        </TagsListContainer>
    )
};

export const TagsList = observer(TagsListBase);

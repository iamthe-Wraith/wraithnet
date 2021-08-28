import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TagModel, TagsModel } from '../../models/tags';
import { Checkbox } from '../Checkbox';
import { Tag } from '../Tag';
import { TagContainer, TagsListContainer } from './styles';

interface IProps {
    onSelectedTagsChange: (selectedTags: TagModel[]) => void;
}

const TagsListBase: FC<IProps> = ({ onSelectedTagsChange }) => {
    const tagsModel = useRef(new TagsModel()).current;
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

    useEffect(() => {
        tagsModel.getTags();
    }, []);

    useEffect(() => {
        onSelectedTagsChange(selectedTags);
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
        return tagsModel.tags.map(t => {
            const isChecked = !!selectedTags.find(selectedTag => selectedTag.id === t.id);
            const tag = (
                <Tag
                    allowHoverHighlight={ !!onSelectedTagsChange }
                    isHighlighted={ isChecked }
                    text={ t.text }
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
        <TagsListContainer>
            { renderTags() }
        </TagsListContainer>
    )
};

export const TagsList = observer(TagsListBase);

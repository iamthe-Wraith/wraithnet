import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { CollectionModel } from '../../models/collection';
import { ITag, TagModel, TagsModel } from '../../models/tags';
import { Button, ButtonType } from '../Button';
import { Checkbox } from '../Checkbox';
import { CTAs } from '../CtasContainer';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { Modal, ModalSize } from '../Modal';
import { Tag, TagType } from '../Tag';
import { TextInput } from '../TextInput';
import { LoadingSpinnerContainer, NewTagModal, NoTagsContainer, TagContainer, TagsListContainer, TagsListItems } from './styles';

interface IProps {
    className?: string;
    forceClearSelectedList?: boolean;
    onSelectedTagsChange?: (selectedTags: TagModel[]) => void;
}

const TagsListBase: FC<IProps> = ({ className, forceClearSelectedList, onSelectedTagsChange }) => {
    const tagsModel = useRef(new TagsModel()).current;
    const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
    const [showTagModal, setShowTagModal] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const tagsEngaged = useRef(false);

    const loadMore = () => {
        // tagsModel.getTags(true);
        tagsModel.tags.loadMore()
            .catch(err => {
                console.log('error loading tags');
                console.error(err);
            });
    };

    useEffect(() => {
        loadMore();
    }, []);

    // useEffect(() => {
    //     tagsModel.getTags();
    //     window.removeEventListener('userlog-update', onUserLogUpdate);
    //     window.addEventListener('userlog-update', onUserLogUpdate);
    //     return () => window.removeEventListener('userlog-update', onUserLogUpdate);
    // }, [tagsModel]);

    useEffect(() => {
        if (forceClearSelectedList) {
            setSelectedTags([]);
        }
    }, [forceClearSelectedList]);

    useEffect(() => {
        if (tagsEngaged.current) {
            onSelectedTagsChange?.(selectedTags);
        }
    }, [selectedTags]);

    const onCreateClick = (name: string) => () => {
        // onCreateNewClick?.(newTagName)
        //     .then((n: NoteModel) => {
        //         // automatically select newly created 
        //         setShowTagModal(false);
        //         setSelectedTags(n)
        //         setNewNoteName('');
        //     })
        //     .catch(err => {
        //         console.log(`error creating ${type}`);
        //         console.error(err);
        //     });
        tagsModel.createTag(name)
            .then(tag => {
                setSelectedTags([...selectedTags, tag]);
                setShowTagModal(false);
            })
            .catch(err => {
                console.log('error creating tag');
                console.log(err);
            });
    }

    const onTagChange = (tag: TagModel) => (e: React.ChangeEvent<HTMLInputElement>) => {
        tagsEngaged.current = true;
        const isSelected = selectedTags.find(selectedTag => selectedTag.id === tag.id);

        if (isSelected) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const renderTags = () => {
        if (tagsModel.tags.allResultsFetched && tagsModel.tags.results.length === 0) {
            return (
                <NoTagsContainer>
                    No tags found
                </NoTagsContainer>
            )
        }

        const tags = tagsModel.tags.results.map(t => {
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

        if (tagsModel.tags.busy) {
            const spinner = (
                <LoadingSpinner
                    className={ tagsModel.tags.firstPageLoaded ? '' : 'loading-spinner' }
                    key='loading-spinner'
                    size={ SpinnerSize.Small }
                    type={ SpinnerType.Two }
                />
            );

            if (tagsModel.tags.firstPageLoaded) {
                tags.push((
                    <LoadingSpinnerContainer key='loading-spinner-container'>
                        { spinner }
                    </LoadingSpinnerContainer>
                ))
            } else {
                tags.push(spinner);
            }
        }

        if (!tagsModel.tags.allResultsFetched && !tagsModel.tags.busy) {            
            return [...tags, <Waypoint key='waypoint' onEnter={ loadMore } topOffset={ 300 } />];
        }

        return tags
    }

    return (
        <TagsListContainer className={ className }>
            <TagsListItems>
                { renderTags() }
            </TagsListItems>
            <CTAs
                className='ctas'
                ctas={[
                    {
                        text: '+ add tag',
                        type: ButtonType.Blank,
                        onClick: () => setShowTagModal(true)
                    }
                ]}
            />
            <Modal
                header='New Tag'
                onClose={() => setShowTagModal(false)}
                isOpen={ showTagModal }
                size={ ModalSize.Small }
            >
                <NewTagModal>
                    <div className='label'>tag name</div>
                    <TextInput
                        inputId={ `new-tag-input` }
                        onChange={e => setNewTagName(e.target.value)}
                        value={ newTagName }
                    />
                    <CTAs
                        ctas={[
                            {
                                disabled: !newTagName,
                                text: 'create',
                                type: ButtonType.Primary,
                                onClick: onCreateClick(newTagName),
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.Blank,
                                onClick: () => setShowTagModal(false),
                            }
                        ]}
                    />
                    { tagsModel.creatingTag && <LoadingSpinner size={ SpinnerSize.Tiny } />}
                </NewTagModal>
            </Modal>
        </TagsListContainer>
    )
};

export const TagsList = observer(TagsListBase);

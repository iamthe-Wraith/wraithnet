import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { NoteModel } from '../../../models/notes';
import { IThemeProps } from '../../../styles/themes';
import { Button, ButtonType } from '../../Button';
import { AngleCorner } from '../../containers/AngleCorner';
import { AnglePos, AngleSize } from '../../containers/AngleCorner/styles';
import { TrashIcon } from '../../svgs/icons/TrashIcon';
import { Tag, TagType } from '../../Tag';

import { InnerContainer, ListItemContainer, NameContainer, NoteActionsContainer, NoteInfoContainer, TagsContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    onClick(): void;
    onDelete?(): void;
    selected?: boolean;
    note: NoteModel;
}

const ListItemBase: React.FC<IProps> = ({ className = '', note, onClick, onDelete, selected, theme }) => {
    const [isHovered, setIsHovered] = useState(false);

    const renderTags = () => {
        if (!note.tags.length) return null;

        const tags = note.tags.map(tag => (
            <Tag
                key={ tag.id }
                allowHoverHighlight={ false }
                className='list-item-tag'
                isHighlighted={ false }
                text={ tag.text }
                type={ TagType.Primary }
            />
        ));

        return (
            <TagsContainer>
                { tags }
            </TagsContainer>
        );
    };

    return (
        <ListItemContainer
            className={ className }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <AngleCorner
                borderColor={ (isHovered || selected) ? theme.primary : theme.gray }
                borderWidth={ 1 }
                className='list-item-angle-corner'
                config={ [{size: AngleSize.Tiny, position: AnglePos.BottomRight}] }
            >
                <InnerContainer>
                    <NoteInfoContainer
                        buttonType={ ButtonType.Blank }
                        onClick={ onClick }
                    >
                        <NameContainer>
                            { note.name }
                        </NameContainer>
                        { renderTags() }
                    </NoteInfoContainer>
                    <NoteActionsContainer className='note-actions-container'>
                        <Button
                            buttonType={ ButtonType.Blank }
                            onClick={ onDelete }
                        >
                            <TrashIcon className='with-fill' />
                        </Button>
                    </NoteActionsContainer>
                </InnerContainer>
            </AngleCorner>
        </ListItemContainer>
    );
};

const ListItemAsObserver = observer(ListItemBase);
export const ListItem = withTheme(ListItemAsObserver);

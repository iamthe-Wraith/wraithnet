import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { NoteModel } from '../../../models/notes';
import { IThemeProps } from '../../../styles/themes';
import { ButtonType } from '../../Button';
import { AngleCorner } from '../../containers/AngleCorner';
import { AnglePos, AngleSize } from '../../containers/AngleCorner/styles';

import { ListItemContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    onClick:() => void;
    selected?: boolean;
    note: NoteModel;
}

const ListItemBase: React.FC<IProps> = ({ className = '', note, onClick, selected, theme }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ListItemContainer
            className={ className }
            buttonType={ ButtonType.Blank }
            onClick={ onClick }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AngleCorner
                borderColor={ (isHovered || selected) ? theme.primary : theme.gray }
                borderWidth={ 1 }
                config={[{size: AngleSize.Tiny, position: AnglePos.BottomRight}]}
            >
                { note.name }
            </AngleCorner>
        </ListItemContainer>
    );
}

const ListItemAsObserver = observer(ListItemBase);
export const ListItem = withTheme(ListItemAsObserver);

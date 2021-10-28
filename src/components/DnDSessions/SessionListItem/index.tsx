import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { NoteModel } from '../../../models/notes';
import { IThemeProps } from '../../../styles/themes';
import { ButtonType } from '../../Button';
import { AngleCorner } from '../../containers/AngleCorner';
import { AnglePos, AngleSize } from '../../containers/AngleCorner/styles';

import { SessionListItemContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    onClick:() => void;
    selected?: boolean;
    session: NoteModel;
}

const SessionListItemBase: React.FC<IProps> = ({ className = '', onClick, selected, session, theme }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <SessionListItemContainer
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
                { session.name }
            </AngleCorner>
        </SessionListItemContainer>
    );
}

const SessionListItemAsObserver = observer(SessionListItemBase);
export const SessionListItem = withTheme(SessionListItemAsObserver);

import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { NoteModel } from '../../../models/notes';
import { IThemeProps } from '../../../styles/themes';
import { Button, ButtonType } from '../../Button';
import { AnglePos, AngleSize } from '../../containers/AngleCorner/styles';

import { DnDMiscResourceContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    id: string;
    onClick?: (resource: NoteModel) => void;
    resource: NoteModel;
    selected?: boolean;
}

const DnDMiscResourceBase: React.FC<IProps> = ({ className = '', id, onClick, resource, selected, theme }) => {
    const onMiscResourceClick = () => {
        onClick(resource);
    }

    return (
        <DnDMiscResourceContainer
            className={ `${ selected ? 'selected ' : '' }${ className }` }
            buttonType={ ButtonType.Blank }
            id={ id }
            onClick={ onMiscResourceClick }
        >
            <div className='misc-resource-name'>{ resource.name }</div>
        </DnDMiscResourceContainer>
    );
}

const DnDMiscResourceAsObserver = observer(DnDMiscResourceBase);
export const DnDMiscResource = withTheme(DnDMiscResourceAsObserver);

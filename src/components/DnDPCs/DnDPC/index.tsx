import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { PCModel } from '../../../models/dnd/pc';
import { IThemeProps } from '../../../styles/themes';
import { Button, ButtonType } from '../../Button';
import { AngleCorner } from '../../containers/AngleCorner';
import { AnglePos, AngleSize, IAngleProps } from '../../containers/AngleCorner/styles';
import { DnDPCLevel } from '../../DnDPCLevel';

import { PCContainer } from './styles';

interface IProps extends IThemeProps, IAngleProps {
    className?: string;
    onClick:(pc: PCModel) => void;
    pc: PCModel;
}

const DnDPCBase: React.FC<IProps> = ({ className = '', onClick, pc, theme, ...restProps }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Button
            className={ className }
            buttonType={ ButtonType.Blank }
            onClick={() => onClick(pc)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            { ...restProps }
        >
            <PCContainer
                className={ className }
                borderColor={ isHovering ? theme.primary : theme.gray }
                borderWidth={ 1 }
                config={[{position: AnglePos.TopRight, size: AngleSize.Tiny}, {position: AnglePos.BottomRight, size: AngleSize.Tiny}]}
            >
                <div className='name'>{ pc.name }</div>
                <div className='metadata'>
                    <div>{ pc.race.name }</div>
                    <div>{ pc.classes.map(c => c.name).join(', ') }</div>
                </div>
                <DnDPCLevel pc={ pc } />
            </PCContainer>
        </Button>
    );
}

const DnDPCAObserver = observer(DnDPCBase);
export const DnDPC = withTheme(DnDPCAObserver);

import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { PCModel } from '../../models/dnd/pc';
import { IThemeProps } from '../../styles/themes';
import { AngleCorner } from '../containers/AngleCorner';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';

import { DnDPCLevelContainer, ExpBar } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    pc: PCModel;
}

const DnDPCLevelBase: React.FC<IProps> = ({ className = '', pc, theme }) => {
    const [exp, setExp] = useState(0);

    // TODO: add animation

    useEffect(() => {
        setExp(pc.exp > 0 ? Math.round((pc.exp / pc.expForNextLevel) * 100) : 0);
    }, [pc.exp]);

    return (
        <DnDPCLevelContainer className={ className }>
            <AngleCorner
                className='current-level'
                backgroundColor={ theme.dark }
                borderColor={ theme.darkGray }
                borderWidth={ 1 }
                config={[{position: AnglePos.TopRight, size: AngleSize.Tiny}]}
            >
                { pc.level }
            </AngleCorner>
            <div className='exp-bar-container'>
                <ExpBar progress={ exp } />
                <div className='exp-values'>
                    <span>{pc.exp}</span>/<span>{pc.expForNextLevel}</span>
                </div>
            </div>
        </DnDPCLevelContainer>
    );
}

export const DnDPCLevel = withTheme(DnDPCLevelBase);

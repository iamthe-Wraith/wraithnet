import { observer } from 'mobx-react';
import React from 'react';

import { StatContainer } from './styles';

interface IProps {
    className?: string;
    label: string;
    value: string | number;
}

const StatBase: React.FC<IProps> = ({ className = '', label, value }) => {
    return (
        <StatContainer className={ className }>
            <div className='label'>
                { label }
            </div>
            <div className='stat'>
                { value }
            </div>
        </StatContainer>
    );
}

export const Stat = observer(StatBase)

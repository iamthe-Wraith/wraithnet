import { observer } from 'mobx-react-lite';
import React from 'react';
import { Dots } from '../Dots';

import { DnDMainHomeContainer } from './styles';

interface IProps {
    className?: string;
}

const DnDMainHomeBase: React.FC<IProps> = ({ className = '' }) => {
    return (
        <DnDMainHomeContainer className={ className }>
            <Dots className='dots' height='150px' />
        </DnDMainHomeContainer>
    );
}

export const DnDMainHome = observer(DnDMainHomeBase);

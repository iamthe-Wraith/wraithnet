import { config, useSpring } from 'react-spring';
import React, { useContext } from 'react';
import { ToasterContext } from '../../contexts/Toaster';

import { ToasterContainer } from './styles';
import { observer } from 'mobx-react';
import { ToastType } from '../../models/toaster';

interface IProps {
    className?: string;
}

const toasterFrom = { opacity: 0, transform: 'translate3d(30px, 0, 0)' };
const toasterTo = { opacity: 1, transform: 'translate3d(0, 0, 0)' };

const ToasterBase: React.FC<IProps> = ({
    className = '',
}) => {
    const toasterModel = useContext(ToasterContext);
    const toasterSpring = useSpring({
        config: config.gentle,
        from: toasterFrom,
        to: !!toasterModel.currentToast ? toasterTo : toasterFrom, 
    });

    if (!toasterModel.currentToast) return null;

    return (
        <ToasterContainer
            className={ `${className} ${toasterModel.currentToast?.type || ToastType.Success}` }
            style={ toasterSpring }
        >
            <div className='text-container'>
                { toasterModel.currentToast?.message }
            </div>
            <div className='ang' />
        </ToasterContainer>
    );
};

export const Toaster = observer(ToasterBase);

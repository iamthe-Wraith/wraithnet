import { config, useSpring } from 'react-spring';
import React, { useContext } from 'react';
import { ToasterContext } from '../../contexts/Toaster';

import { ToasterContainer } from './styles';
import { observer } from 'mobx-react';
import { ToastType } from '../../models/toaster';

interface IProps {
  className?: string;
}

const overlayFrom = { opacity: 0 };
const overlayTo = { opacity: 1 };
const toasterFrom = { ...overlayFrom, transform: 'translate3d(-50%, -80%, 0)' };
const toasterTo = { ...overlayTo, transform: 'translate3d(-50%, -50%, 0)' };

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
      className={ `${className} ${toasterModel.currentToast.type || ToastType.Success}` }
      style={ toasterSpring }
    >
      { toasterModel.currentToast.message }
    </ToasterContainer>
  );
};

export const Toaster = observer(ToasterBase);

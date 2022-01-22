import { config, useSpring } from 'react-spring';
import React, { useContext } from 'react';
import { ToasterContext } from '../../contexts/Toaster';

import { ToasterContainer } from './styles';
import { observer } from 'mobx-react';
import { ToastType } from '../../models/toaster';
import { AngleCorner } from '../containers/AngleCorner';
import { withTheme } from 'styled-components';
import { IThemeProps } from '../../styles/themes';
import { AnglePos, AngleSize } from '../containers/AngleCorner/styles';

interface IProps extends IThemeProps {
    className?: string;
}

const toasterFrom = { opacity: 0, transform: 'translate3d(0, -30px, 0)' };
const toasterTo = { opacity: 1, transform: 'translate3d(0, 0, 0)' };

const ToasterBase: React.FC<IProps> = ({
    className = '',
    theme,
}) => {
    const toasterModel = useContext(ToasterContext);
    const toasterSpring = useSpring({
        config: config.gentle,
        from: toasterFrom,
        to: !!toasterModel.currentToast ? toasterTo : toasterFrom, 
    });

    const getBorderColor = () => {
        switch (toasterModel.currentToast?.type) {
            case ToastType.Error: return theme.error;
            case ToastType.Warning: return theme.highlight1;
            default: return theme.primary;
        }
    };

    if (!toasterModel.currentToast) return null;

    return (
        <ToasterContainer
            className={ className }
            style={ toasterSpring }
        >
            <AngleCorner
                childrenContainerClassName='text-container'
                config={ [{ position: AnglePos.BottomLeft, size: AngleSize.Tiny }] }
                backgroundColor={ theme.dark }
                borderColor={ getBorderColor() }
            >
                { toasterModel.currentToast?.message }
            </AngleCorner>
        </ToasterContainer>
    );
};

const ToasterAsObserver = observer(ToasterBase);
export const Toaster = withTheme(ToasterAsObserver);

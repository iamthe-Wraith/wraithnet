import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { DashboardIpcRenderer } from '../../models/ipcRenderers/dashboard';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { LogIcon } from '../svgs/icons/LogIcon';
import { XIcon } from '../svgs/icons/XIcon';
import { LogoutIcon } from '../svgs/icons/LogoutIcon';
import { Center, CenterContent, HeaderContainer, Side } from './styles';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';
import { DashboardNav } from '../DashboardNav';

interface IProps extends IThemeProps {
    centerContent: string;
    className?: string;
    leftContent?: JSX.Element;
    onClose:() => void;
    rightContent?: JSX.Element;
}

const HeaderBase: React.FC<IProps> = ({
    centerContent,
    className = '',
    leftContent,
    onClose,
    rightContent,
}) => {
    return (
        <HeaderContainer className={ className }>
            <Button
                buttonType={ ButtonType.Blank }
                className='close'
                onClick={ onClose }
            >
                <XIcon />
            </Button>
            <Side className='left'>
                <div />
                <div>
                    { leftContent }
                </div>
            </Side>
            <Center>
                <CenterContent>
                    { centerContent }
                </CenterContent>
            </Center>
            <Side className='right'>
                <div />
                <div>
                    { rightContent }
                </div>
            </Side>
        </HeaderContainer>
    )
};

export const Header = observer(HeaderBase);
import { observer } from 'mobx-react';
import React from 'react';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { XIcon } from '../svgs/icons/XIcon';
import { Center, CenterContent, HeaderContainer, Side } from './styles';

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
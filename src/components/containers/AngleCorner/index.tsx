import React, { FC } from 'react';
import { AngleCornerContainer, Background, Border, ChildrenContainer, IAngleProps } from './styles';

interface IProps extends IAngleProps {
    className?: string;
}

export const AngleCorner: FC<IProps> = ({ children, className, ...restProps }) => {
    const { borderWidth, borderColor } = restProps;

    return (
        <AngleCornerContainer className={ className } { ...restProps }>
            { (!!borderWidth || !!borderColor) && <Border { ...restProps } /> }
            <Background { ...restProps } />
            <ChildrenContainer>
                { children }
            </ChildrenContainer>
        </AngleCornerContainer>
    );
};

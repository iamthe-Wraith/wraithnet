import React, { FC } from 'react';
import { AngleCornerContainer, Background, Border, ChildrenContainer, IAngleProps } from './styles';

interface IProps extends IAngleProps {
    className?: string;
    onMouseEnter?:React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?:React.MouseEventHandler<HTMLDivElement>;
}

export const AngleCorner: FC<IProps> = ({ children, className, onMouseEnter, onMouseLeave, ...restProps }) => {
    const { borderWidth, borderColor } = restProps;

    return (
        <AngleCornerContainer
            className={ className }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }
            { ...restProps }
        >
            { (!!borderWidth || !!borderColor) && <Border { ...restProps } /> }
            <Background { ...restProps } />
            <ChildrenContainer>
                { children }
            </ChildrenContainer>
        </AngleCornerContainer>
    );
};

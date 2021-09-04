import React, { FC, useEffect, useRef, useState } from 'react';
import { cellSize, Dot, DotsContainer } from './styles';

interface IProps {
    className?: string;
    height?: string;
    width?: string;
}

export const Dots: FC<IProps> = ({ className = '', height, width }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);

    useEffect(() => {
        const { clientHeight, clientWidth } = containerRef.current;
        setRows(Math.floor(clientHeight / cellSize));
        setCols(Math.floor(clientWidth / cellSize));
    }, [containerRef.current]);

    const renderDots = () => {
        const dots: JSX.Element[] = [];

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                dots.push(<Dot key={ `dot-${c}-${r}` } />)
            }
        }

        return dots;
    };

    return (
        <DotsContainer ref={ containerRef } className={ className } height={ height } width={ width }>
            { renderDots() }
        </DotsContainer>
    )
};

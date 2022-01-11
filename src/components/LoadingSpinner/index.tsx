import React, { useRef } from 'react';
import { Container, Spinner } from './styles';
import { Spinner1 } from '../svgs/spinners/Spinner1';
import { Spinner2 } from '../svgs/spinners/Spinner2';
import { Spinner3 } from '../svgs/spinners/Spinner3';
import { Spinner4 } from '../svgs/spinners/Spinner4';
import { Spinner5 } from '../svgs/spinners/Spinner5';
import { Spinner6 } from '../svgs/spinners/Spinner6';
import { Spinner7 } from '../svgs/spinners/Spinner7';
import { Spinner8 } from '../svgs/spinners/Spinner8';

export enum SpinnerSize {
    Tiny = 'tiny',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum SpinnerType {
    Random = 0,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
}

interface IProps {
    className?: string;
    size?: SpinnerSize;
    type?: SpinnerType;
}

export const LoadingSpinner: React.FC<React.PropsWithChildren<IProps>> = ({ children, className, size = SpinnerSize.Medium, type = SpinnerType.Four }) => {
    const rand = useRef(Math.floor(Math.random() * 7) + 1).current;

    const renderSpinner = (spinner: number) => {
        switch (spinner) {
            case SpinnerType.One: return <Spinner1 />;
            case SpinnerType.Two: return <Spinner2 />;
            case SpinnerType.Three: return <Spinner3 />;
            case SpinnerType.Four: return <Spinner4 />;
            case SpinnerType.Five: return <Spinner5 />;
            case SpinnerType.Six: return <Spinner6 />;
            case SpinnerType.Seven: return <Spinner7 />;
            case SpinnerType.Eight: return <Spinner8 />;
        }
    };

    return (
        <Container className={ className }>
            <Spinner size={ size }>
                { renderSpinner(type === SpinnerType.Random ? rand : type) }
            </Spinner>
            { children && <div className='loading-spinner-content'>{ children }</div> }
        </Container>
    );
};

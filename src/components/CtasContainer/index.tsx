import React from 'react';
import { Button, ButtonType } from '../Button';
import { CtasContainer } from './styles';

interface ICta {
    className?: string;
    text: string;
    type: ButtonType;
    onClick: () => void;
}

interface IProps {
    className?: string;
    ctas: ICta[];
}

export const CTAs: React.FC<IProps> = ({ className = '', ctas }) => {
    const renderCtas = () => {
        return ctas.map((cta, i) => (
            <Button
                key={ `cta-${i} `}
                buttonType={ cta.type }
                className={ cta.className || '' }
                onClick={ cta.onClick }
            >
                { cta.text }
            </Button>
        ))
    }

    return (
        <CtasContainer className={ className }>
            { renderCtas() }
        </CtasContainer>
    );
}

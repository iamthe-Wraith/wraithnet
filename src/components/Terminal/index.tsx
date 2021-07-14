import React from 'react';

import { OuterContainer, Container } from './styles';

export const Terminal: React.FC<any> = ({ theme }) => {
    const onClick = () => {

    }

    return (
        <OuterContainer theme={ theme }>
            <Container onClick={onClick}>
                Terminal
            </Container>
        </OuterContainer>
    )
}
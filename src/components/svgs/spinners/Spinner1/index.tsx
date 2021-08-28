import React from 'react';
import { SvgIcon } from '../../SvgIcon';
import { IThemeProps } from '../../../../styles/themes';
import { Container } from './styles';
import { withTheme } from 'styled-components';

interface IProps extends IThemeProps {
    color1?: string;
    color2?: string;
    duration?: number;
}

const Spinner1Base: React.FC<IProps> = ({ theme }) => {
    const size = 128;

    return (
        <SvgIcon
            id='spinner-1'
            viewBox={ `0 0 ${ size } ${ size }` }
            width={ size }
            height={ size }
        >
            <Container>
                <path
                    d="M63.9 127.8C28.7 127.8 0 99.2 0 63.9H6C6 95.8 32 121.8 63.9 121.8C95.8 121.8 121.8 95.8 121.8 63.9C121.8 32 95.8 6 63.9 6V0C99.1 0 127.8 28.6 127.8 63.9C127.8 99.2 99.1 127.8 63.9 127.8Z"
                    fill={ theme.primary }
                    id='spinner-1-1'
                />
                <path
                    d="M63.9 115.7V109.7C89.1 109.7 109.6 89.2 109.6 64C109.6 38.8 89.1 18.3 63.9 18.3C54.5 18.3 45.4 21.2 37.7 26.5L34.3 21.6C43 15.5 53.3 12.3 63.9 12.3C92.4 12.3 115.6 35.5 115.6 64C115.6 92.5 92.4 115.7 63.9 115.7Z"
                    fill={ theme.highlight1 }
                    id='spinner-1-2'
                />
                <path
                    d="M63.9 91.8C48.5 91.8 36 79.3 36 63.9C36 48.5 48.5 36 63.9 36C79.3 36 91.8 48.5 91.8 63.9C91.7 79.3 79.2 91.8 63.9 91.8ZM63.9 37C49.1 37 37 49.1 37 63.9C37 78.7 49.1 90.8 63.9 90.8C78.7 90.8 90.8 78.7 90.8 63.9C90.7 49.1 78.7 37 63.9 37Z"
                    fill={ theme.primary }
                    id='spinner-1-3'
                />
            </Container>
        </SvgIcon>
    );
};

export const Spinner1 = withTheme(Spinner1Base);
import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const TimeContainer = styled.div<IThemeProps>`
    { FlexHorizontalCenter }
    justify-content: flex-start;

    span:not(.colon) {
        ${ PrimaryFont }
        color: ${({theme}) => theme.primaryDark};
        display: inline-block;
        min-width: 30px;
        text-align: center;

        &.hours {
            text-align: right;
        }

        &.seconds {
            text-align: left;
        }

        &.ampm {
            margin-left: 4px;
        }
    }

    span.colon {
        color: ${({theme}) => theme.gray};
    }
`;

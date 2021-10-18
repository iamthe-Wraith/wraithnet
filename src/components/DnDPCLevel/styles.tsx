import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

interface IExpBarProps extends IThemeProps {
    progress: number;
}

export const DnDPCLevelContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter}

    .current-level {
        ${ FlexCenter }
        ${ PrimaryFont }
        padding: 5px 15px;
        font-size: 21px;
    }

    .exp-bar-container {
        flex-grow: 1;
        padding-left: 10px;

        .exp-values {
            font-size: 12px;
    
            span {
                padding: 0 2px;
            }
        }
    }
`;

export const ExpBar = styled.div<IExpBarProps>`
    width: 100%;
    height: 10px;
    padding: 1px;
    border-radius: 20px;
    background: ${({theme}) => theme.darkestGray};

    &:before {
        content: ' ';
        display: block;
        height: 100%;
        border-radius: 20px;
        background: ${({theme}) => `linear-gradient(to right, ${theme.primaryDark}, ${theme.primary})`};
        width: ${({progress}) => `${progress}%`};
    }
`;

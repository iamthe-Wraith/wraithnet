import styled from 'styled-components';
import { AbsoluteCenter, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DnDPCsContainer = styled.div<IThemeProps>`
    min-height: 100px;
    position: relative;

    .header {
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        margin-bottom: 10px;

        .header-text {
            ${ PrimaryFont }
            color: ${({theme}) => theme.primary};
        }
    }

    .pc-list-container {
        height: calc(100% - 60px);
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        .pc {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .add-pc-container {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        height: 30px;
    }

    .spinner {
        ${ AbsoluteCenter }
    }
`

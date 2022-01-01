import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { AngleCorner } from '../containers/AngleCorner';

const scratchPadWidth = 500;
const scratchPadHeight = 400;

export const ScratchPadContainer = styled.div`
    .scratch-pad-btn {
        &:hover {
            svg {
                fill: ${({theme}) => theme.highlight1};
            }    
        }

        svg {
            fill: ${({theme}) => theme.darkGray};
        }
    }
`;

export const ScratchPadWrapper = styled(AngleCorner)`
    position: relative;
    width: ${scratchPadWidth}px;
    height: ${scratchPadHeight}px;

    &:before,
    &:after {
        content: ' ';
        position: absolute;
        right: calc(100% + 2px);
        width: 4px;
    }

    .scratch-pad-children-container {
        ${ FlexHorizontalCenter }
        align-items: stretch;
    }

    .header-container {
        ${ FlexCenter }
        min-width: 30px;
        max-width: 30px;

        .header {
            ${ PrimaryFont }
            min-width: ${scratchPadHeight}px;
            padding-left: 30px;
            transform: rotate3d(0, 0, 1, -90deg);
        }
    }

    .scratch-pad {
        min-width: calc(100% - 30px);
        max-width: calc(100% - 30px);
        height: ${scratchPadHeight - 10}px;
        padding: 5px 10px;
        border: none;
    }
`;

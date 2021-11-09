import styled from 'styled-components';
import { SvgIcon } from '../../SvgIcon';

export const ChevronSvg = styled(SvgIcon)`
    &.up {
        transform: rotateZ(180deg);
    }

    &.right {
        transform: rotateZ(-90deg);
    }

    &.down {}

    &.left {
        transform: rotateZ(90deg);
    }
`

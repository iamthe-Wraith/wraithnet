import styled from 'styled-components';

export const BasicBottomContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;

    .bottom {
        position: absolute;
        top: 100%;
        left: 20px;
        width: calc(100% - 40px);
        height: 1px;
        background: ${({theme}) => theme.primary};

        &.bottom-1 {
            &:before,
            &:after {
                content: ' ';
                position: absolute;
                bottom: 0;
                width: 20px;
                height: 20px;
                border-bottom: ${({theme}) => `1px solid ${theme.primary}`};
            }

            &:before {
                right: 100%;
                border-left: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(45deg);
            }

            &:after {
                left: 100%;
                border-right: ${({theme}) => `1px solid ${theme.primary}`};
                transform: skew(-45deg);
            }
        }

        &.bottom-2 {
            top: calc(100% + 5px);
        }
    }
`;
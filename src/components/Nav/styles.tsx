import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const NavContainer = styled.div<IThemeProps>`
    ${ FlexHorizontalCenter }

    .icon-link {
        line-height: 0;
        margin-right: 10px;
        padding: 0; 

        &:hover:not(.selected) {
            cursor: default;

            span.icon {
                color: ${({theme}) => theme.highlight1};
            }

            svg.icon {
                &:not(.with-stroke) {
                    fill: ${({theme}) => theme.highlight1};
                }
                
                &.with-stroke {
                    stroke: ${({theme}) => theme.highlight1};
                }
            }
        }

        &.selected {
            span {
                color: ${({theme}) => theme.primary};
            }

            svg {
                &.icon:not(.with-stroke) {
                    fill: ${({theme}) => theme.primary};
                }

                &.icon.with-stroke {
                    stroke: ${({theme}) => theme.primary};
                }
            }
        }

        span {
            color: ${({theme}) => theme.darkGray};
            display: block;
        }

        svg {
            transition: .15s ease-in-out;
            
            &.icon {
                height: 15px;
                width: 15px;
            }
        }

        svg:not(.with-stroke) {
            fill: ${({theme}) => theme.darkGray};
        }

        svg.with-stroke {
            stroke: ${({theme}) => theme.darkGray};
        }
    }
`;
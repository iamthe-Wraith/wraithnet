import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const DashboardNavContainer = styled.div<IThemeProps>`
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
                fill: ${({theme}) => theme.highlight1};
            }
        }

        &.selected {
            span {
                color: ${({theme}) => theme.primary};
            }

            svg {
                fill: ${({theme}) => theme.light};

                &.icon {
                    fill: ${({theme}) => theme.primary};
                }
            }
        }

        span {
            color: ${({theme}) => theme.darkGray};
            display: block;
            padding: 3px 0 0 2px;
        }

        svg {
            fill: ${({theme}) => theme.darkGray};
            
            transition: .15s ease-in-out;
            
            &.icon {
                height: 15px;
                width: 15px;
            }
        }
    }
`;
import styled from 'styled-components';
import { PrimaryFont } from '../../styles/styles';

export const Header = styled.div`
    ${ PrimaryFont }
    padding-bottom: 10px;
`;

export const SettingsContainer = styled.div``;

export const ThemeOptionsContainer = styled.div`
    .theme-option {
        &:not(:last-child) {
            margin-bottom: 7px;
        }
    }
`;

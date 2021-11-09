import styled from 'styled-components';
import { headerHeight } from '../Header/styles';
import { footerHeight } from '../Footer/styles';
import { FlexHorizontalCenter, PrimaryFont } from '../../styles/styles';
import { IThemeProps } from '../../styles/themes';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    .header-left-content {
        ${ FlexHorizontalCenter }
        justify-content: space-between;
        min-width: 100%;
    }
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    max-width: 200px;
    min-width: 200px;
    padding: 10px;
`;

export const DateContainer = styled.div<IThemeProps>`
    ${ PrimaryFont }
    color: ${({theme}) => theme.primaryDark};
`;

export const LeftCol = styled(Col)``;

export const RightCol = styled(Col)`
    justify-content: flex-start;

    .time {
        font-size: 21px;

        span:not(.colon) {
            min-width: 40px;
        }
    }
`;

export const MainCol = styled.div`
    height: 100%;
    flex-grow: 1;
`;

export const MainContainer = styled.div`
    display: flex;
    height: calc(100% - ${headerHeight + footerHeight}px);
    overflow: hidden;
`;

export const UserId = styled.div<IThemeProps>`
    color: ${({theme}) => theme.darkGray};
    font-size: 12px;
    padding-left: 20px;
`;

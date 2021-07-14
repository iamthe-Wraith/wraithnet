import styled from 'styled-components';

export const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1px;
  background: ${({ theme }) => `linear-gradient(-45deg, ${theme.primaryDark}, ${theme.primaryLight})`};
`;

export const Container = styled.div`
    height: calc(100vh - 2px);
    width: calc(100vw - 2px);
    padding: 10px;
    background: radial-gradient(ellipse at top left, ${({ theme }) => theme.darkestGray}, ${({ theme }) => theme.dark});
`;
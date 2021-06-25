import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 10px;

  h1 {
    color: ${({ theme }) => theme.primary};
  }
`;

export const InputWrapper = styled.div`
  .input {}
`;

export const ButtonContainer = styled.div`
  display: flex;
`;
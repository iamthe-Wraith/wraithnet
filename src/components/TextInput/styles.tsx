import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border: 1px solid ${({theme}) => theme.gray};
  margin: 30px 0;

  &.focused {
    border: 1px solid ${({theme}) => theme.light};
  }

  input {
    background: none;
    border: none;
    flex-grow: 1;
    outline: none;
  }
`;
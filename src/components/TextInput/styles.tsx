import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 5px;
  border: 1px solid ${({theme}) => theme.gray};

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
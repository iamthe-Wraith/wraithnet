import styled from 'styled-components';
import { gray, light } from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  border: 1px solid ${gray};

  &.focused {
    border: 1px solid ${light};
  }

  input {
    background: none;
    border: none;
    flex-grow: 1;
    outline: none;
  }
`;
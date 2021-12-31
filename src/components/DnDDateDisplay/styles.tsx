import styled from 'styled-components';
import { FlexHorizontalCenter } from '../../styles/styles';

export const ControlsContainer = styled.div`
  ${ FlexHorizontalCenter }
  justify-content: space-between;
  min-width: 150px;
  padding: 8px 10px;

  button {
    padding: 0;
    
    &:hover {
      .with-fill {
        fill: ${({theme}) => theme.primaryDark};
      }
    }
  }

  .with-fill {
    fill: ${({theme}) => theme.primary};
  }
`;

export const DnDDateDisplayContainer = styled.div`
  position: relative;
`;

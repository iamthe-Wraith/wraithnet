import styled from 'styled-components';
import { FlexCenter, FlexCol, FlexHorizontalCenter } from '../../styles/styles';
import { Modal } from '../Modal';

export const FileContent = styled.div`
  ${ FlexHorizontalCenter }
  justify-content: space-between;
`;

export const ImagesModalContainer = styled(Modal)`
  .body {
    justify-content: space-between;
  }

  input {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  ${ FlexCol }
  align-items: center;
  min-width: 16%;
  max-width: 16%;
  margin: 4px 0.333%;
  padding: 5px;

  & > div:first-child {
    ${ FlexCenter }
    min-height: 80px;
    max-height: 80px;
    padding-bottom: 5px;

    img {
      display: block;
      max-width: 75px;
      max-height: 75px;
      transition: transform .3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  & > div:last-child {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    min-height: 28px;
    max-height: 28px;
    font-size: 11px;
    overflow: hidden;
    text-align: center;
  }
`;

export const ImagesContainer = styled.div`
  ${ FlexHorizontalCenter }
  flex-wrap: wrap;
  min-width: 100%;
  min-height: 100px;
  overflow: auto;
`;

export const ImageUploadConfirmationModal = styled(Modal)``;

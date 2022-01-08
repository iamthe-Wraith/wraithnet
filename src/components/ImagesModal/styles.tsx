import styled from 'styled-components';
import { FlexCenter, FlexCol, FlexHorizontalCenter, NoScrollBar } from '../../styles/styles';
import { Modal } from '../Modal';

export const FileContent = styled.div`
  ${ FlexHorizontalCenter }
  justify-content: space-between;
`;

export const FileExtOptions = styled.div`
    ${FlexCol}
    padding-top: 10px;

    h4 {
        margin-bottom: 10px;
    }

    .file-type-option {
        font-size: 12px; 
        
        &:not(:last-child) {
            margin-bottom: 4px;
        }
    }
`;

export const FilterContainer = styled.div`
    ${ FlexCol }
    min-width: 220px;
    max-width: 220px;
    min-height: 100%;
    margin-right: 30px;
`;

export const ImagesModalContainer = styled(Modal)`
    .modal-container {
        min-height: 800px;
        max-height: 800px;
    }

    .body {
        justify-content: space-between;
    }

    input[type="file"] {
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
            width: 100%;
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
    ${ NoScrollBar }
    ${ FlexHorizontalCenter }
    flex-grow: 1;
    flex-wrap: wrap;
    min-height: 100px;
    max-height: calc(75vw - 100px);
    overflow: auto;
`;

export const ImageUploadConfirmationModal = styled(Modal)``;

export const InnerContainer = styled.div`
    width: 65vw;
    height: calc(75vh - 100px);
`;

export const LoadingSpinnerContainer = styled.div`
    position: relative;
    min-width: 100%;
    min-height: 100px;
`;

export const MainImagesContainer = styled.div`
    ${ FlexHorizontalCenter };
    flex-grow: 1;
    align-items: flex-start;
    min-width: 100%;
    max-height: 100%;
    overflow: hidden;
`;
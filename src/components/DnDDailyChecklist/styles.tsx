import styled from 'styled-components';
import { FlexCenter, FlexHorizontalCenter, NoScrollBar, PrimaryFont } from '../../styles/styles';

export const DnDDailyChecklistContainer = styled.div`
    position: relative;
    padding: 20px 10px 10px;

    .list-container {
        ${ NoScrollBar }
        min-height: 100px;
        max-height: calc(100% - 25px);
        overflow: auto;

        .no-items {
          ${ FlexCenter }
          padding-top: 20px;
        }
    }

    .checklist-item {
        max-width: 100%;
        
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }

    .add-item-container {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        height: 25px;

        button {
            padding: 0;
        }
    }

    .text-input {
        input {
            ${ PrimaryFont }
        }
    }

    .label {
        margin-top: 10px;
        font-size: 12px;
        color: ${({theme}) => theme.gray};
    }

    .details-textarea {
        textarea {
            height: 100px;
            padding: 5px;
        }
    }

    .ctas-container {
        ${ FlexHorizontalCenter }
        justify-content: flex-end;
        margin-top: 10px;
    }

    .decorator-top {
        .top-1 {
            &:after {
                border-right: none;
            }
        }
    }

    .decorator-bottom {
        .bottom-1 {
            &:after {
                border-right: none;
            }
        }
    }

    .decorator-left {
        top: 12.5%;
        right: calc(100% + 8px);
        height: 75%;
    }
`;
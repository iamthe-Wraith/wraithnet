import styled from 'styled-components';

export const DnDDailyChecklistContainer = styled.div`
    position: relative;
    padding: 20px 10px 10px;

    .list-container {
        min-height: 200px;
        max-height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .checklist-item {
        max-width: 100%;
        
        &:not(:last-child) {
            margin-bottom: 5px;
        }
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
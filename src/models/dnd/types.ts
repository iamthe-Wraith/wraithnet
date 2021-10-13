import { IBase } from "../../types";

export interface ICampaign extends IBase {
    name: string;
    startDate: string;
    currentDate: string;
}
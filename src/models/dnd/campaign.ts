import { action, computed, makeObservable, observable } from "mobx";
import { DnDDate } from "../../lib/dndDate";
import { BaseModel } from "../base";
import { CampaignDailyChecklistModel } from "./daily-checklist";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
    '_campaign' |
    '_currentDate' |
    '_dailyChecklist' |
    '_startDate';

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: CampaignDailyChecklistModel = null;
    private _currentDate: DnDDate = null;
    private _startDate: DnDDate = null;
    
    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _currentDate: observable,
            _dailyChecklist: observable,
            _startDate: observable,
            busy: computed,
            createdAt: computed,
            currentDate: computed,
            dailyChecklist: computed,
            startDate: computed,
            id: computed,
            name: computed,
        });

        this._campaign = campaign;
        this._dailyChecklist = new CampaignDailyChecklistModel(campaign);
        this._startDate = DnDDate.parseStringToDnDDate(campaign.startDate);
        this._currentDate = DnDDate.parseStringToDnDDate(campaign.currentDate);
    }

    get busy() { return this._busy }
    get createdAt() { return this._campaign.createdAt }
    get dailyChecklist() { return this._dailyChecklist }
    get id() { return this._campaign.id }
    get name() { return this._campaign.name }
    get startDate() { return this._startDate };
    get currentDate() { return this._currentDate };
}
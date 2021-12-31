import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { DnDDate } from "../../lib/dndDate";
import { BaseModel } from "../base";
import { CollectionModel } from "../collection";
import { INote, INoteRef, NoteModel } from "../notes";
import { CampaignDailyChecklistModel } from "./daily-checklist";
import { IExpResponse, IPCRef, PCModel } from "./pc";
import { ICampaign } from "./types";

type PrivateFields = '_busy' |
'_campaign' |
'_currentDate' |
'_dailyChecklist' |
'_items' |
'_locations' |
'_misc' |
'_npcs' |
'_pcs' |
'_quests' |
'_sessions' |
'_startDate' |
'_stats';

export interface ICampaignStats {
    sessions?: number;
    npcs?: number;
    locations?: number;
    quests?: number;
    items?: number;
    pcs?: number;
    daysElapsed?: number;
    inGameDaysElapsed?: number;
    lastSession?: string;
}

export class CampaignModel extends BaseModel {
    private _busy = false;
    private _campaign: ICampaign = null;
    private _dailyChecklist: CampaignDailyChecklistModel = null;
    private _currentDate: DnDDate = null;
    private _items: CollectionModel<INoteRef, NoteModel> = null;
    private _locations: CollectionModel<INoteRef, NoteModel> = null;
    private _misc: CollectionModel<INoteRef, NoteModel> = null;
    private _npcs: CollectionModel<INoteRef, NoteModel> = null;
    private _pcs: PCModel[] = [];
    private _quests: CollectionModel<INoteRef, NoteModel> = null;
    private _sessions: CollectionModel<INoteRef, NoteModel> = null;
    private _startDate: DnDDate = null;
    private _stats: ICampaignStats = null;
    public changingDate = false;
    public loadingPCs = false;
    public gettingStats = false;
    public creatingPC = false;
    public updatingPartyXP = false;
    
    constructor (campaign: ICampaign) {
        super();
        makeObservable<CampaignModel, PrivateFields>(this, {
            _busy: observable,
            _campaign: observable,
            _currentDate: observable,
            _dailyChecklist: observable,
            _items: observable,
            _locations: observable,
            _misc: observable,
            _npcs: observable,
            _pcs: observable,
            _quests: observable,
            _sessions: observable,
            _startDate: observable,
            _stats: observable,
            creatingPC: observable,
            gettingStats: observable,
            loadingPCs: observable,
            updatingPartyXP: observable,
            busy: computed,
            createdAt: computed,
            currentDate: computed,
            dailyChecklist: computed,
            items: computed,
            locations: computed,
            misc: computed,
            npcs: computed,
            pcs: computed,
            quests: computed,
            sessions: computed,
            startDate: computed,
            stats: computed,
            id: computed,
            name: computed,
            changeDate: action.bound,
            createLocation: action.bound,
            createNPC: action.bound,
            createSession: action.bound,
            getStats: action.bound,
            loadPCs: action.bound,
        });

        this._campaign = campaign;
        this._dailyChecklist = new CampaignDailyChecklistModel(campaign);
        this._startDate = new DnDDate(campaign.startDate);
        this._currentDate = new DnDDate(campaign.currentDate);
        this._items = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/item`),
            (note: INoteRef) => new NoteModel(note, this._items),
        );
        this._locations = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/location`),
            (note: INoteRef) => new NoteModel(note, this._locations),
        );
        this._misc = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/misc`),
            (note: INoteRef) => new NoteModel(note, this._misc),
        );
        this._npcs = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/npc`),
            (note: INoteRef) => new NoteModel(note, this._npcs),
        );
        this._quests = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/quest`),
            (note: INoteRef) => new NoteModel(note, this._quests),
        );
        this._sessions = new CollectionModel<INoteRef, NoteModel>(
            this.composeUrl(`/dnd/${this.id}/session`),
            (note: INoteRef) => new NoteModel(note, this._sessions),
        );
    }

    get busy() { return this._busy; }
    get createdAt() { return this._campaign.createdAt; }
    get dailyChecklist() { return this._dailyChecklist; }
    get id() { return this._campaign.id; }
    get name() { return this._campaign.name; }
    get startDate() { return this._startDate; }
    get currentDate() { return this._currentDate; }
    get items() { return this._items; }
    get locations() { return this._locations; }
    get misc() { return this._misc; }
    get npcs() { return this._npcs; }
    get pcs() { return this._pcs; }
    get quests() { return this._quests; }
    get sessions() { return this._sessions; }
    get stats() { return this._stats; }

    public changeDate = async (direction: 'next' | 'previous') => {
        if (this.changingDate) return null;
    
        this.changingDate = true;

        const result = await this.webServiceHelper.sendRequest<ICampaign>({
            path: this.composeUrl(`/dnd/${this._campaign.id}/date`),
            method: 'PATCH',
            data: { direction },
        });

        if (result.success) {
            runInAction(() => {
                this._campaign = result.value;
                this._currentDate = new DnDDate(this._campaign.currentDate);
                this.changingDate = false;
            });
            return this._campaign;
        } else {
            runInAction(() => {
                this.changingDate = false;
            });

            throw new Error(result.error);
        }
    }

    public createItem = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/item`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newItem = new NoteModel(result.value, this._items);
                runInAction(() => {
                    this.items.push(newItem);
                    this._busy = false;
                });
                return newItem;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createLocation = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/location`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newLocation = new NoteModel(result.value, this._locations);
                runInAction(() => {
                    this.locations.push(newLocation);
                    this._busy = false;
                });
                return newLocation;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createMiscNote = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/misc`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newMiscNote = new NoteModel(result.value, this._misc);
                runInAction(() => {
                    this.misc.push(newMiscNote);
                    this._busy = false;
                });
                return newMiscNote;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createNPC = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/npc`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newNPC = new NoteModel(result.value, this._npcs);
                runInAction(() => {
                    this.npcs.push(newNPC);
                    this._busy = false;
                });
                return newNPC;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createPC = async (
        name: string,
        race: string,
        classes: string[],
        age: number,
        exp: number,
        level: number,
    ) => {
        if (!this.creatingPC) {
            this.creatingPC = true;

            const data = {
                name,
                race,
                classes,
                age,
                exp,
                level,
            };

            const result = await this.webServiceHelper.sendRequest<IPCRef>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc`),
                method: 'POST',
                data,
            });
    
            if (result.success) {
                const newPC = new PCModel(this._campaign, result.value);
                runInAction(() => {
                    this._pcs = [newPC, ...this._pcs];
                    this.creatingPC = false;
                }); 
                return newPC;
            } else {
                runInAction(() => {
                    this.creatingPC = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createQuest = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/quest`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newQuest = new NoteModel(result.value, this._quests);
                runInAction(() => {
                    this.quests.push(newQuest);
                    this._busy = false;
                });
                return newQuest;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public createSession = async (name: string) => {
        if (!this._busy) {
            this._busy = true;

            const result = await this.webServiceHelper.sendRequest<INote>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/session`),
                method: 'POST',
                data: { name },
            });

            if (result.success) {
                const newSession = new NoteModel(result.value, this._sessions);
                runInAction(() => {
                    this._sessions.unshift(newSession);
                    this._busy = false;
                }); 
                return newSession;
            } else {
                runInAction(() => {
                    this._busy = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public getStats = async () => {
        if (!this.gettingStats) {
            this.gettingStats = true;

            const result = await this.webServiceHelper.sendRequest<ICampaignStats>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/stats`),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._stats = result.value;
                    this.gettingStats = false;
                }); 
            } else {
                runInAction(() => {
                    this.gettingStats = false;
                });
                
                throw new Error(result.error);
            }
        } 
    }

    public loadPCs = async () => {
        if (!this.loadingPCs) {
            this.loadingPCs = true;

            const result = await this.webServiceHelper.sendRequest<IPCRef[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/pc`),
                method: 'GET',
            });
    
            if (result.success) {
                runInAction(() => {
                    this._pcs = result.value.map(pc => new PCModel(this._campaign, pc));
                    this.loadingPCs = false;
                }); 
            } else {
                runInAction(() => {
                    this.loadingPCs = false;
                });
                
                throw new Error(result.error);
            }
        }
    }

    public updatePartyXP = async (value: string) => {
        if (!this.updatingPartyXP) {
            this.updatingPartyXP = true;

            const result = await this.webServiceHelper.sendRequest<{pc: IPCRef, exp: IExpResponse}[]>({
                path: this.composeUrl(`/dnd/${this._campaign.id}/party-exp`),
                method: 'PATCH',
                data: { exp: value },
            });
    
            if (result.success) {
                runInAction(() => {
                    result.value.forEach(x => {
                        const pc = this._pcs.find(p => p.id === x.pc.id);
                        if (pc) {
                            pc.setPc(x.pc);
                            pc.leveledUp = x.exp.leveledUp;
                        }
                    });

                    this.updatingPartyXP = false;
                }); 
            } else {
                runInAction(() => {
                    this.updatingPartyXP = false;
                });
                
                throw new Error(result.error);
            }
        }
    }
}
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { DnDDate } from '../../lib/dndDate';
import { BaseModel } from '../base';
import { CollectionModel } from '../collection';
import { INoteRef, NoteModel } from '../notes';
import { CampaignModel } from './campaign';
import { DnDClassModel, IDnDClass } from './class';
import { DnDRaceModel } from './race';
import { ICampaign } from './types';

type PrivateFields = '_busy' |
'_campaign' |
'_campaigns' |
'_classes' |
'_creating' |
'_init' |
'_levels' |
'_loadingClasses' |
'_loadingLevels' |
'_loadingRaces' |
'_misc' |
'_races';

export interface IDnDExp {
  level: number;
  threshold: number;
}

export class DnDModel extends BaseModel {
  private _busy = false;
  private _creating = false;
  private _campaign: CampaignModel = null;
  private _campaigns: ICampaign[] = [];
  private _classes: DnDClassModel[] = []
  private _levels: IDnDExp[] = [];
  private _loadingRaces = false;
  private _loadingLevels = false;
  private _loadingClasses = false;
  private _misc: CollectionModel<INoteRef, NoteModel> = null;
  private _races: DnDRaceModel[] = []; 

  constructor() {
    super();
    makeObservable<DnDModel, PrivateFields>(this, {
      _busy: observable,
      _campaign: observable,
      _campaigns: observable,
      _classes: observable,
      _creating: observable,
      _levels: observable,
      _loadingClasses: observable,
      _loadingLevels: observable,
      _loadingRaces: observable,
      _misc: observable,
      _races: observable,
      busy: computed,
      campaign: computed,
      campaigns: computed,
      classes: computed,
      creating: computed,
      levels: computed,
      loadingClasses: computed,
      loadingLevels: computed,
      loadingRaces: computed,
      misc: computed,
      races: computed,
      _init: action.bound,
      getCampaigns: action.bound,
      getClasses: action.bound,
      getLevels: action.bound,
      getRaces: action.bound,
      forceSelect: action.bound,
      setCampaign: action.bound,
    });
    this._init();
  }

  get busy () { return this._busy; }
  get campaign() { return this._campaign; }
  get campaigns() { return this._campaigns; }
  get classes() { return this._classes; }
  get creating() { return this._creating; }
  get levels() { return this._levels; }
  get loadingClasses() { return this._loadingClasses; }
  get loadingLevels() { return this._loadingLevels; }
  get loadingRaces() { return this._loadingRaces; }
  get misc() { return this._misc; }
  get races() { return this._races; }

  public createCampaign = async (name: string, startDate: DnDDate) => {
    if (!this._busy) {
      this._busy = true;
    
      const result = await this.webServiceHelper.sendRequest<ICampaign>({
        path: this.composeUrl('/dnd'),
        method: 'POST',
        data: { name, startDate: startDate.stringify() },
      });
    
      if (result.success) {
        runInAction(() => {
          this._busy = false;
          this._campaigns = [...this._campaigns, result.value];
        }); 
      } else {
        runInAction(() => {
          this._busy = false;
        });
                
        throw new Error(result.error);
      }
    }
  }

  public getCampaigns = async () => {
    if (!this._busy) {
      this._busy = true;
    
      const result = await this.webServiceHelper.sendRequest<ICampaign[]>({
        path: this.composeUrl('/dnd'),
        method: 'GET',
      });
    
      if (result.success) {
        runInAction(() => {
          this._busy = false;
          this._campaigns = result.value;
        }); 
      } else {
        runInAction(() => {
          this._busy = false;
        });
                
        throw new Error(result.error);
      }
    }
  }

  public getClasses = async () => {
    if (!this._loadingClasses && !this.classes?.length) {
      this._loadingClasses = true;

      const result = await this.webServiceHelper.sendRequest<IDnDClass[]>({
        path: this.composeUrl('/dnd/static/class'),
        method: 'GET',
      });
    
      if (result.success) {
        runInAction(() => {
          this._classes = result.value.map(c => new DnDClassModel(c));
          this._loadingClasses = false;
        }); 
      } else {
        runInAction(() => {
          this._loadingClasses = false;
        });
                
        throw new Error(result.error);
      }
    }
  }

  public getLevels = async () => {
    if (!this._loadingLevels && !this.levels?.length) {
      this._loadingLevels = true;

      const result = await this.webServiceHelper.sendRequest<IDnDExp[]>({
        path: this.composeUrl('/dnd/static/levels'),
        method: 'GET',
      });
    
      if (result.success) {
        runInAction(() => {
          this._levels = result.value;
          this._loadingLevels = false;
        }); 
      } else {
        runInAction(() => {
          this._loadingLevels = false;
        });
                
        throw new Error(result.error);
      }
    }
  }

  public getRaces = async () => {
    if (!this._loadingRaces && !this.races?.length) {
      this._loadingRaces = true;

      const result = await this.webServiceHelper.sendRequest<ICampaign[]>({
        path: this.composeUrl('/dnd/static/race'),
        method: 'GET',
      });
    
      if (result.success) {
        runInAction(() => {
          this._races = result.value.map(race => new DnDRaceModel(race));
          this._loadingRaces = false;
        }); 
      } else {
        runInAction(() => {
          this._loadingRaces = false;
        });
                
        throw new Error(result.error);
      }
    }
  }

  public setCampaign = (campaign: ICampaign) => {
    if (!campaign) {
      this._campaign = null;
      return;
    }
        
    this._campaign = new CampaignModel(campaign);
  }

  public forceSelect = () => {
    this._campaign = new CampaignModel(this.campaigns[0]);
  }

  private _init = () => {
    this._misc = new CollectionModel<INoteRef, NoteModel>(
      this.composeUrl('/dnd/notes/misc'),
      (note: INoteRef) => new NoteModel(note, this._misc),
    );
  }
}

import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Themes } from "../constants";
import { IWraithnetConfig } from "../lib/config";
import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";

export enum UserRole {
    GOD = 'GOD',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

export interface UserStatuses {
    verified: boolean;
}

export interface IUserModel {
    id: string;
    createdAt: string;
    email: string;
    role: UserRole;
    statuses: UserStatuses;
    username: string;
}

export interface IUserSettings {
    theme: Themes;
}

type PrivateFields = '_loaded' | 
'_user' | 
'_settings' | 
'_webServiceHelper' | 
'load' |
'loadSettings';

export class UserModel {
    private _loaded = false;
    private _user: IUserModel = null;
    private _settings: IWraithnetConfig = null;
    private _webServiceHelper: WraithnetApiWebServiceHelper = null;

    constructor(initSettings: IUserSettings) {
        makeObservable<UserModel, PrivateFields>(this, {
            _loaded: observable,
            _user: observable,
            _settings: observable,
            _webServiceHelper: observable,
            isLoaded: computed,
            username: computed,
            email: computed,
            settings: computed,
            webServiceHelper: computed,
            load: action.bound,
            loadSettings: action.bound,
        });

        // set user's settings/configuration to the local
        // ones until their own settins are returned from
        // the db.
        this._settings = initSettings;

        this.load();
        this.loadSettings();
    }

    get id() { return this._user?.id; }
    get createdAt() { return this._user?.createdAt; }
    get email() { return this._user.email; }
    get isLoaded() { return this._loaded; }
    get role() { return this._user?.role; }
    get settings() { return this._settings; }
    get statuses() { return this._user?.statuses; }
    get username() { return this._user?.username; }

    get webServiceHelper() {
        if (!this._webServiceHelper) {
            // only want to instantiate object when used...
            this._webServiceHelper = new WraithnetApiWebServiceHelper();
        }
    
        return this._webServiceHelper;
    }

    public toJs = () => this._user;

    private load = async () => {
        const result = await this.webServiceHelper.sendRequest<IUserModel>({
            path: '/api/v1/profile',
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._user = result.value;
                this._loaded = true;
            });
        } else {
            throw new Error(result.error);
        }
    }

    private loadSettings = async () => {
        const result = await this.webServiceHelper.sendRequest<IUserSettings>({
            path: '/api/v1/user-settings',
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                console.log('>>>>> user settings loaded', result.value);
                this._settings = result.value;
            });
        } else {
            throw new Error(result.error);
        }
    }
}

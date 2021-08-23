import { action, computed, makeObservable, observable, runInAction } from "mobx";
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

type PrivateFields = '_loaded' | '_user' | '_webServiceHelper' | 'load';

export class UserModel {
    private _loaded = false;
    private _user: IUserModel = null;
    private _webServiceHelper: WraithnetApiWebServiceHelper = null;

    constructor() {
        makeObservable<UserModel, PrivateFields>(this, {
            _loaded: observable,
            _user: observable,
            _webServiceHelper: observable,
            isLoaded: computed,
            username: computed,
            email: computed,
            webServiceHelper: computed,
            load: action.bound,
        });

        this.load();
    }

    get id() {
        return this._user?.id;
    }

    get createdAt() {
        return this._user?.createdAt
    }

    get email() {
        return this._user.email;
    }

    get isLoaded() {
        return this._loaded;
    }

    get role() {
        return this._user?.role;
    }

    get statuses() {
        return this._user?.statuses;
    }

    get username() {
        return this._user?.username;
    }

    get webServiceHelper() {
        if (!this._webServiceHelper) {
          // only want to instantiate object when used...
          this._webServiceHelper = new WraithnetApiWebServiceHelper();
        }
    
        return this._webServiceHelper;
    }

    public toJs = () => this._user;

    private load = async () => {
        const result = await this.webServiceHelper.sendRequest({
            path: '/api/v1/profile',
            method: 'GET',
        });

        if (result.success) {
            runInAction(() => {
                this._user = result.value;
                this._loaded = true;
            });
        } else {
            throw new Error(result.value);
        }
    }
}

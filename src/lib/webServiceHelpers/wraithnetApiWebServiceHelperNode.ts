import axios, { AxiosInstance, Method } from 'axios';
import { action, observable, makeObservable } from 'mobx';
import keytar from 'keytar';

type PrivateFields = '_apiBaseUrl' | '_authToken' | '_client' | '_headers';

interface IRequestConfig {
  data?: any;
  method: Method;
  path: string;
}

export class WraithnetApiWebServiceHelperNode {
  private _apiBaseUrl: string = null;
  private _authToken: string = '';
  private _client: AxiosInstance = null;
  private _headers: any = {};

  constructor() {
    makeObservable<WraithnetApiWebServiceHelperNode, PrivateFields>(this, {
      _apiBaseUrl: observable,
      _authToken: observable,
      _client: observable.ref,
      _headers: observable,
      initClient: action,
      sendRequest: action,
    });

    this._apiBaseUrl = 'http://localhost:8080';
    this._headers = {
      ...this._headers,
      'Service-Name': 'wraithnet',
    };
    this.setAuthToken();
    this.initClient();
  }

  initClient = () => {
    this._client = axios.create({
      headers: this._headers,
      baseURL: this._apiBaseUrl,
    });
    
    this._client.interceptors.request.use(config => {
      const updatedConfig = { ...config };

      if (this._authToken) updatedConfig.headers.Authorization = this._authToken;

      return updatedConfig;
    }, err => Promise.reject(err));

    this._client.interceptors.response.use(response => {
      if (response?.headers?.authorization) {
        this._authToken = response.headers.authorization;
        keytar.setPassword('wraithnet', 'wraithnet', this._authToken);
      } else {
        this._authToken = null;
        keytar.deletePassword('wraithnet', 'wraithnet');
      }

      return response;
    }, err => Promise.reject(err));
  }

  sendRequest = async ({ data, method, path }: IRequestConfig, tokenOptional?: boolean) => {
    if (!this._client) {
      return {
        success: false,
        value: 'web service client not found',
      };
    }

    if (!this._authToken && !tokenOptional) {
      try {
        const token = await keytar.getPassword('wraithnet', 'wraithnet');
        if (token) this._authToken = token;
      } catch (err) {
        return {
          success: false,
          value: 'no token '
        }
      }
    }

    try {      
      const response = await this._client({ data, method, url: `${this._apiBaseUrl}${path}` });

      return {
        success: response?.status >= 200 && response?.status < 300,
        value: response?.data,
      };
    } catch (error) {
      return {
        success: false,
        value: error.response?.data,
      };
    }
  }

  private setAuthToken = async () => {
    this._authToken = await keytar.getPassword('wraithnet', 'wraithnet');
  }
}

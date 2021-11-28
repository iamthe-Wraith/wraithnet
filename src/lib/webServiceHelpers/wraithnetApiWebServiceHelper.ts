import axios, { AxiosInstance, AxiosRequestHeaders, Method } from 'axios';
import { action, observable, makeObservable, computed } from 'mobx';

type PrivateFields = '_apiBaseUrl' | '_authToken' | '_client' | '_headers';

interface IRequestConfig {
  data?: any;
  method: Method;
  queryParams?: { [key: string]: any };
  path: string;
  headers?: AxiosRequestHeaders;
}

interface IResponse<T> {
  success: boolean;
  value?: T;
  error?: string;
}

export class WraithnetApiWebServiceHelper {
  private _apiBaseUrl: string = null;
  private _authToken = '';
  private _client: AxiosInstance = null;
  private _headers: any = {};

  constructor() {
    makeObservable<WraithnetApiWebServiceHelper, PrivateFields>(this, {
      _apiBaseUrl: observable,
      _authToken: observable,
      _client: observable.ref,
      _headers: observable,
      apiBaseUrl: computed,
      client: computed,
      initClient: action,
      sendRequest: action,
    });

    this._apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://wraithnet-api.onrender.com';
    this._headers = {
      ...this._headers,
      'Service-Name': 'wraithnet',
    };
    this.setAuthToken();
    this.initClient();
  }

  get apiBaseUrl() { return this._apiBaseUrl; }
  get client() { return this._client; }

  private _constructQuery = (params: { [key: string]: any }) => {
    const query: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        query.push(`${key}=${value}`);
      }
    });

    return query.length > 0
      ? `?${query.join('&')}`
      : '';
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
        (window as any).App.setToken(this._authToken); 
      } else {
        this._authToken = null;
        (window as any).App.deleteToken();
      }

      return response;
    }, err => Promise.reject(err));
  }

  sendRequest = async <T>({ data, method, queryParams, path, headers }: IRequestConfig, tokenOptional?: boolean): Promise<IResponse<T>> => {
    if (!this._client) {
      return {
        success: false,
        error: 'web service client not found',
      };
    }

    if (!this._authToken && !tokenOptional) await this.setAuthToken();

    const query = !!queryParams ? this._constructQuery(queryParams) : '';

    try {      
      const response = await this._client({
        data,
        method,
        url: `${this._apiBaseUrl}${path}${query}`,
        headers,
      });

      return {
        success: response?.status >= 200 && response?.status < 300,
        value: response?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data,
      };
    }
  }

  sendFormDataRequest = async <T>(url: string, method: Method, formData: FormData): Promise<IResponse<T>> => {
    try {
      if (!this._authToken) await this.setAuthToken();

      const response = await this._client.post(url, formData, { headers: this._headers });

      return {
        success: response?.status >= 200 && response?.status < 300,
        value: response?.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data,
      };
    }
  }

  private setAuthToken = async () => {
    try {
      const token = await (window as any).App.getToken();
      if (token) this._authToken = token;
    } catch (err) {
      return {
        success: false,
        error: 'no token found',
      };
    }
  }
}

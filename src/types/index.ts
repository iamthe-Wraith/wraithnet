import 'electron';
// import { AxiosResponse, Method } from 'axios';

export enum ENV {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

export interface ICoords {
  x:number;
  y:number;
}

export type IInputType = 'email' | 'number' | 'password' | 'text';

export enum LoginErrorArea {
  Username = 'Username',
  Password = 'Password',
  Global = 'Global'
}

export interface IWindow {
  close(): void;
  focus(): void;
  render(): void;
  send(name: string, data: any): void;
}

export interface IWindowProps {
  display?:number|string;
  frame?:boolean;
  x?:number|string;
  y?:number|string;
  width?:number|string;
  height?:number|string;
  backgroundColor?:string;
  filename?:string;
  data?:any;
  resizable?: boolean;
  webPreferences?: Electron.WebPreferences;
  onClose?: () => void;
  onClosed?: () => void;
}

export interface IWindowSize {
  width:number;
  height:number;
}

export interface IBase {
    createdAt: string;
    id: string;
}

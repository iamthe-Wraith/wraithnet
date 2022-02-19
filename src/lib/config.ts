import os from 'os';
import path from 'path';
import fs from 'fs';
import { Themes } from '../constants';

export interface IWraithnetConfig {
    theme: string;
}

const configPath = path.resolve(os.homedir(), `.wraithnet`);

const defaultWraithnetConfig: IWraithnetConfig = {
    theme: Themes.Breeze,
};

export const initWraithnetConfig = () => {
    fs.writeFileSync(configPath, JSON.stringify(defaultWraithnetConfig, null, 4));
    return defaultWraithnetConfig;
};

export const getWraithnetConfig = () => fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath, 'utf8'))
    : initWraithnetConfig();
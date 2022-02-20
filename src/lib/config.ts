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

export const updateWraithnetConfig = ({ theme }: Partial<IWraithnetConfig> = {}) => {
    if (!fs.existsSync(configPath)) initWraithnetConfig();

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const _updates = { ...config };

    if (!!theme) _updates.theme = theme;

    fs.writeFileSync(configPath, JSON.stringify(_updates, null, 4));
};
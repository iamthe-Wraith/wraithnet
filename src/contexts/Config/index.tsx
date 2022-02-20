import React, { createContext, FC, useState } from 'react';
import { IWraithnetConfig } from '../../lib/config';
import { DashboardIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/dashboard';

export const ConfigContext = createContext(null);

export const ConfigStore: FC = ({ children }) => {
    const [config, setConfig] = useState<IWraithnetConfig>(IpcRenderer.loadConfig());

    return (
        <ConfigContext.Provider value={ { config, setConfig } }>
            {children}
        </ConfigContext.Provider>
    );
};
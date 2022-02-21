import React, { createContext, FC } from 'react';
import { TimeModel } from '../../models/time';

export const TimeContext = createContext<TimeModel>(null);

export const TimeStore: FC = ({ children }) => {
    return (
        <TimeContext.Provider value={ new TimeModel() }>
            {children}
        </TimeContext.Provider>
    );
};
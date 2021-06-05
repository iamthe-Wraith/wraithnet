import { createContext, useContext } from 'react';

import { App } from '../models/app';

const AppContext = createContext(new App());
export const useApp = () => useContext(AppContext);
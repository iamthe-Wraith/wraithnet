import React, { createContext } from "react";
import { DnDModel } from "../../models/dnd";

export const DnDContext = createContext<DnDModel>(null);

export const DnDStore: React.FC = ({ children }) => {
    return (
        <DnDContext.Provider value={new DnDModel()}>
            {children}
        </DnDContext.Provider>
    )
};

import React, { createContext } from "react";
import { CampaignsModel } from "../../models/dnd";

export const DnDContext = createContext<CampaignsModel>(null);

export const DnDStore: React.FC = ({ children }) => {
    return (
        <DnDContext.Provider value={new CampaignsModel()}>
            {children}
        </DnDContext.Provider>
    )
};

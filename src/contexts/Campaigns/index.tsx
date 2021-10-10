import React, { createContext } from "react";
import { CampaignsModel } from "../../models/campaigns";

export const CampaignsContext = createContext<CampaignsModel>(null);

export const CampaignsStore: React.FC = ({ children }) => {
    return (
        <CampaignsContext.Provider value={new CampaignsModel()}>
            {children}
        </CampaignsContext.Provider>
    )
};

import React, { createContext, useContext } from "react";
import { UserModel } from "../../models/user";
import { ConfigContext } from "../Config";

export const UserContext = createContext<UserModel>(null);

export const UserStore: React.FC = ({ children }) => {
    const { config } = useContext(ConfigContext);

    return (
        <UserContext.Provider value={ new UserModel({ theme: config.theme }) }>
            {children}
        </UserContext.Provider>
    );
};

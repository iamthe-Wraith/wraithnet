import React, { createContext } from "react";
import { UserModel } from "../../models/user";

export const UserContext = createContext<UserModel>(null);

export const UserStore: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={ new UserModel() }>
      {children}
    </UserContext.Provider>
  );
};

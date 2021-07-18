import React, { createContext } from "react";
import { IUserModel, UserModel } from "../../models/user";

export const UserContext = createContext<IUserModel>(null);

export const UserStore: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={new UserModel()}>
      {children}
    </UserContext.Provider>
  )
};

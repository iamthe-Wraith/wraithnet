import React, { createContext } from "react";
import { IUser, User } from "../../models/user";

export const UserContext = createContext<IUser>(null);

export const UserStore: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={new User()}>
      {children}
    </UserContext.Provider>
  )
};

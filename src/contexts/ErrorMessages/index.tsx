import React, { createContext } from "react";
import { ErrorMessagesModel } from "../../models/errorMessages";

export const ErrorMessagesContext = createContext<ErrorMessagesModel>(null);

export const ErrorMessagesStore: React.FC = ({ children }) => {
  return (
    <ErrorMessagesContext.Provider value={ new ErrorMessagesModel() }>
      {children}
    </ErrorMessagesContext.Provider>
  );
};

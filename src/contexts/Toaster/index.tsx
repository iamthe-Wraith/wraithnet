import React, { createContext } from "react";
import { ToasterModel } from "../../models/toaster";

export const ToasterContext = createContext<ToasterModel>(null);

export const ToasterStore: React.FC = ({ children }) => {
  return (
    <ToasterContext.Provider value={ new ToasterModel() }>
      {children}
    </ToasterContext.Provider>
  );
};

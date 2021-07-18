import React, { createContext } from "react";
import { TerminalModel } from "../../models/terminal";

export const TerminalContext = createContext<TerminalModel>(null);

export const TerminalStore: React.FC = ({ children }) => {
  return (
    <TerminalContext.Provider value={new TerminalModel()}>
      {children}
    </TerminalContext.Provider>
  )
};

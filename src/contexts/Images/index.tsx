import React, { createContext } from "react";
import { ImagesModel } from "../../models/images";

export const ImagesContext = createContext<ImagesModel>(null);

export const ImagesStore: React.FC = ({ children }) => {
  return (
    <ImagesContext.Provider value={ new ImagesModel() }>
      {children}
    </ImagesContext.Provider>
  );
};

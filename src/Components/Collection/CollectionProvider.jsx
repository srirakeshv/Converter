import React, { useContext, createContext, useState } from "react";

const CollectionContext = createContext();

export const Collection = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
  const [collectImage, setCollectImage] = useState([]);
  const addToCollection = (collectImg) => {
    setCollectImage([...collectImage, collectImg]);
  };
  return (
    <CollectionContext.Provider value={{ collectImage, addToCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

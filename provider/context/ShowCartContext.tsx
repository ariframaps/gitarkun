"use client";

import { createContext, Dispatch, useContext, useState } from "react";

type ShowCartContextType = {
  showCart: boolean;
  setShowCart: Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue: ShowCartContextType = {
  showCart: false,
  setShowCart: () => {},
};

const ShowCartContext = createContext<ShowCartContextType>(defaultValue);

export const ShowCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <ShowCartContext.Provider value={{ showCart, setShowCart }}>
      {children}
    </ShowCartContext.Provider>
  );
};

export const useShowCart = () => useContext(ShowCartContext);

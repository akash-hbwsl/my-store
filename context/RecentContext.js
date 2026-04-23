"use client";

import { createContext, useContext, useCOntext, useState } from "react";

const RecentContext = createContext();

export function RecentProvider({ children }) {
  const [recent, setRecent] = useState([]);

  const addRecent = (product) => {
    setRecent((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  return (
    <RecentContext.Provider value={{ recent, addRecent }}>
      {children}
    </RecentContext.Provider>
  );
}

export const useRecent = () => useContext(RecentContext);

"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const RecentContext = createContext();

export function RecentProvider({ children }) {
  const [recent, setRecent] = useState([]);
  const [hasLoadedRecent, setHasLoadedRecent] = useState(false);

  useEffect(() => {
    const savedRecent = localStorage.getItem("recentlyViewed");
    if (!savedRecent) {
      setHasLoadedRecent(true);
      return;
    }

    try {
      setRecent(JSON.parse(savedRecent));
    } catch (error) {
      console.error("Error loading recently viewed products:", error);
    } finally {
      setHasLoadedRecent(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedRecent) return;
    localStorage.setItem("recentlyViewed", JSON.stringify(recent));
  }, [recent, hasLoadedRecent]);

  const addRecent = useCallback((product) => {
    setRecent((prev) => {
      const filtered = prev.filter((p) => p._id !== product._id);
      return [product, ...filtered].slice(0, 5);
    });
  }, []);

  return (
    <RecentContext.Provider value={{ recent, addRecent }}>
      {children}
    </RecentContext.Provider>
  );
}

export const useRecent = () => useContext(RecentContext);

import { useState, useEffect } from "react";

const STORAGE_KEY = "searchHistory";

interface HistoryItem {
  id: string;
  title: string;
  imageUrl: string;
}

const useSearchHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addHistory = (item: HistoryItem) => {
    const updatedHistory = [
      item,
      ...history.filter((h) => h.id !== item.id),
    ].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addHistory, clearHistory };
};

export default useSearchHistory;

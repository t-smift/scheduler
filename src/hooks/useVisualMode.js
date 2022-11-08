import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const newHistory = [...history];
  
  const transition = function (newMode, replace = false) {
    if (!replace) {
      newHistory.push(mode);
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }
    newHistory[newHistory.length - 1] = mode;
    setHistory((prev) => [...prev])
    setMode(newMode)
  }
  const back =() => {
    if (history.length > 1) {
      const newHistory = [...history].slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
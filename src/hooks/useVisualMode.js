import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const newHistory = [...history];
  
  const transition = function (mode, replace = false) {
    if (!replace) {
      newHistory.push(mode);
      setHistory(newHistory);
      setMode(mode);
    }
    newHistory[newHistory.length - 1] = mode;
    setHistory(newHistory)
    setMode(newHistory[newHistory.length - 1])
  }
  const back = function () {
    if (newHistory.length > 1) {
      setMode(newHistory[newHistory.length - 1]);
    }

    newHistory.pop();
    setMode(newHistory[newHistory.length -1])
    setHistory(newHistory);
  }

  return { mode, transition, back };
}
import React, { useState, useEffect } from "react";

//Function to switch between different modes of component
export default function useVisualMode(initial) {
  const [mode, setMode] =  useState(initial);
  const [history, setHistory] = useState([initial]);

  //Set the mode to a new mode and save the previous mode in history state
  function transition (newMode, replace = false) {    
    console.log("------->1"+ history);
    let newValue = [...history, newMode];
    setHistory(newValue);    
    setMode(newMode);

    if(replace === true) {
      newValue.pop();
      setHistory(newValue);
    }
  }

  //Go back to previous mode
  function back(){
    if(history.length > 1) {
      console.log("------->2"+ history);
      history.pop();
      let newValue = history[history.length-1];
      setMode(newValue);
    }
  }
  return {mode, transition, back}
}
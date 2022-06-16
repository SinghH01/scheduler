import { useState } from "react";

//Function to switch between different modes of component
export default function useVisualMode(initial) {

  const [mode, setMode] =  useState(initial);
  const [history, setHistory] = useState([initial]);

  //Set the mode to a new mode and save the previous mode in history state
  function transition (newMode, replace = false) {    
    
    let newValue = [...history, newMode];
    //setHistory(prev => ([...prev, newValue]));   
    setHistory(newValue) 
    setMode(newMode);

    if(replace === true) {
      newValue.pop();
      //setHistory(prev => ([...prev, newValue])); 
      setHistory(newValue)
    }

  }

  //Go back to previous mode
  function back(){
    if(history.length > 1) {
      
      history.pop();
      let newValue = history[history.length-1];
      setMode(newValue);
    }
  }
  return {mode, transition, back}
}
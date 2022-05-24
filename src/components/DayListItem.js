import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {  
  // Function to return appropriate message based on how many spots are available
  function formatSpots(spots) {    
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    
    return `${spots} spots remaining`;
  }

  let dayClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected" : props.selected,
      "day-list__item--full" : props.spots === 0
    }
  )

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

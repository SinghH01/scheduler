import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";


export default function InterviewerListItem(props) {  


  // Apply different classes based on if item is selected or not
  let interviewerClass = classNames(
    "interviewers__item",
    {
      "interviewers__item--selected" : props.selected,  
    }
  );
  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* Conditional display of name if item is selected */}
      {props.selected && props.name}
    </li>
  );
}

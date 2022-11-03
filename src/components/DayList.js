import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  const days = props.days;
  const isDayAnArray = Array.isArray(days);

  const parsedDays = 
  isDayAnArray &&
  days.map((day) => (
    <DayListItem 
    {...day} 
    key={day.id} 
    setDay={props.onChange}
    selected={day.name === props.value} />
  ));
  return (
    <ul>
      {parsedDays}
    </ul>
  )
}
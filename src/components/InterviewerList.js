import React from "react";
import InterviewerListItem from "./InterviewerListItem.js";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const ints = props.interviewers;
  const isIntAnArray = Array.isArray(ints);

  const parsedInts = 
  isIntAnArray &&
  ints.map((int) => (
    <InterviewerListItem
    {...int}
    key={int.number}
    setInterviewer={() => props.onChange(int.id)}
    selected={int.id === props.value} />
  ));
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul 
        className="interviewers__list">
        {parsedInts}
      </ul>
    </section>
  )
}
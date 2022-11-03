import React, { useState } from 'react';
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js"

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const handleStudent = function (event) {
    setStudent(event.target.value)
  }
  const reset = function () {
    setStudent("")
    setInterviewer(null)
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={handleStudent}
            value={student}
          />
        </form> 
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}
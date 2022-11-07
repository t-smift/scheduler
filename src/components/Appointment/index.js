import "./styles.scss"
import React, { Fragment } from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "./Form.js"
import Status from "./Status.js"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    if (interviewer) {
      transition(SAVING)
      props.bookInterview(props.id, interview).then(() => transition(SHOW))
    }
  }
  return (
    <article className="appointment">
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving"}/>
      )}
    </Fragment>  
    </article>
  )
};
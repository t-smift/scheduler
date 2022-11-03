import "./styles.scss"
import React, { Fragment } from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"


export default function Appointment(props) {
  return (
    <article className="appointment">
    <Fragment>
      <Header time={props.time}/>
      {props.interview ? 
      <Show 
        student={props.interview.student} 
        interview={props.interview.interviewer}/> : 
      <Empty/>}
    </Fragment>  
    </article>
  )
} 
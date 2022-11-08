import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList.js"
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const bookInterview = function (id, interview) {
    console.log('book:', id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(setState({...state, appointments}))
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .delete(`/api/appointments/${id}`)
    .then(setState(prev => ({...prev, appointments: appointments})))
    
  }
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ])
    .then((all) => {
      const dayPromise = all[0].data;
      const appointmentPromise = all[1].data;
      const interviewerPromise = all[2].data
      setState(prev => ({...prev, days: dayPromise, appointments: appointmentPromise, interviewers: interviewerPromise}))
    })
  },[]);
  

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)

  let dailyInterviewers = getInterviewersForDay(state, state.day)

  const parsedAppointments = 
  Object.values(dailyAppointments).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log('appointment:', appointment.interview)

    return (
    <Appointment 
    key={appointment.id} 
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers = {dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}

          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule" >
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

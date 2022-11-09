import React, { useState, useEffect } from "react";
import DayList from "./DayList.js"
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)

  let dailyInterviewers = getInterviewersForDay(state, state.day)

  const parsedAppointments = 
  Object.values(dailyAppointments).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    

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

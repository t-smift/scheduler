import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const calculateSpotsRemaining = function (state, appointments) {
    return state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments
            .map((id) => (appointments[id]))
            .filter(({interview}) => {
              return !interview
            }).length
        };
      }
      return day
    });
  };

  const bookInterview = function (id, interview) {
    console.log('book:', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(setState({ ...state, appointments, days: calculateSpotsRemaining(state, appointments) }));
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(setState(prev => ({ ...prev, appointments: appointments, days: calculateSpotsRemaining(state, appointments) })));

  };
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
        const interviewerPromise = all[2].data;
        setState(prev => ({ ...prev, days: dayPromise, appointments: appointmentPromise, interviewers: interviewerPromise }));
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
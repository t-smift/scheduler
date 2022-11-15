import React, { useState, useEffect } from "react";
import axios from "axios";

//sets state for application, initial day is set to Monday and the rest are empty to begin
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

//function will update the 'spots remaining' when booking or cancelling an appointment, by adjusting state
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
      return day;
    });
  };
//adds an new appointment to the appointments object, returns a put call to the API and sets the new state, wich calls the above function as well
  const bookInterview = function (id, interview) {
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

  //takes an aoointment with given ID and sets the interview to null, returns the same style as above. 
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
};
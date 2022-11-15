//function takes in state and a given day and returns an array of appointment objects
export function getAppointmentsForDay(state, day) {
  let result = [];

  const selectedDay = state.days.find(eachDay => eachDay.name === day);
  if (!selectedDay) return result;
  //returns an empty array if the selected day does not exist

  for (const appId of selectedDay.appointments) {
    const appointmentObj = state.appointments[appId];
    result.push(appointmentObj);
  }

  return result;
};

//fetches a particular interview and returns the interview object, containing a student and an interviewer
export function getInterview(state, interview) {
  if (!interview) return null;

  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return newObj;
};

//takes in state and a selected day, and returns an array of interviewers to populate the appointment form
export function getInterviewersForDay(state, day) {
  let interviewerList = [];

  for (const interviewerDay of state.days) {
    if (interviewerDay.name === day) {
      interviewerList = interviewerDay.interviewers;
    }
  };
  //checks if the interviewers are available on the selected day
  let finalIntList = interviewerList.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    }
  });

  return finalIntList;
};
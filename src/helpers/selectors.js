export function getAppointmentsForDay(state, day) {
  let result = [];

  const selectedDay = state.days.find(eachDay => eachDay.name === day);
  if (!selectedDay) return result;

  for (const appId of selectedDay.appointments) {
    const appointmentObj = state.appointments[appId];
    result.push(appointmentObj);
  }

  return result;
};

export function getInterview(state, interview) {
  if (!interview) return null;
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
};

export function getInterviewersForDay(state, day) {
  let interviewerList = [];

  for (const interviewerDay of state.days) {
    if (interviewerDay.name === day) {
      interviewerList = interviewerDay.interviewers;
    }
  };
  let finalIntList = interviewerList.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    }
  });

  return finalIntList;
};
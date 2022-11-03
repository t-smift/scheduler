export default function getAppointmentsForDay(state, day) {
  let result = [];

  const selectedDay = state.days.find(eachDay => eachDay.name === day);
  if (!selectedDay) return result;

  for (const appId of selectedDay.appointments) {
    const appointmentObj = state.appointments[appId]
    result.push(appointmentObj);
  }

  return result;
}
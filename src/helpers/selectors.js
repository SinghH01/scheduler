//Function to return appointments for a specific day

export function getAppointmentsForDay(state, day) {

  // Array to be returned
  let appointmentArray = [];

  for(const item of state.days) {
    if(item.name === day) {

      // Loop through appointments of specific day and push it into the array to be returned
      for(const individualAppointment of item.appointments) {
        appointmentArray.push(state.appointments[individualAppointment]);
      }
    }
  }

  return appointmentArray;

}

export function getInterview(state, interview){
  let interviewData = {};
  if(interview) {
    interviewData = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer] 
    }
    //console.log(interviewData)
     return interviewData;

     
  } else {

    return null;

  }
}

export function getInterviewersForDay(state, day) {

  // Array to be returned
  let interviewersArray = [];

  for(const item of state.days) {
    if(item.name === day) {

      // Loop through interviewers of specific day and push it into the array to be returned
      for(const individualInterviewer of item.interviewers) {
        interviewersArray.push(state.interviewers[individualInterviewer]);
      }
    }
  }
  return interviewersArray;

}

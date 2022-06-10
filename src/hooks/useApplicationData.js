  import axios from "axios";
  import {useState, useEffect} from "react"
  
  export default function useApplicationData() {
  //Combine all useStates into one
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  // Update the state with the new day
  const setDay = day => setState({ ...state, day });


// Book new interview
function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  }; 

  return axios.put (`http://localhost:8001/api/appointments/${id}`, {interview})
  .then ( () => {
    setState({...state, appointments});      
  });
  
}

//Cancel an interview
function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  }; 

  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then ( () => {
    setState({...state, appointments});      
  });
}

useEffect(()=> {
  // Fetch days, appointments and interviewers data using API 
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ])
  .then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  })

},[])  

return {state, setDay, bookInterview, cancelInterview}

  }

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


  // Update the state with the new day
  const setDay = day => setState({ ...state, day });

  // Function return array of days object's with updated spots
  function updateSpots(appointments) {
  
    let newArray =  state.days.map((day) => {
      let count = 0;
      for(const appointment of day.appointments) {
        if(appointments[appointment].interview === null) {
          count++;
        }
      }
      return {...day, spots: count};
    }
    )
    return newArray;
    }

  
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
    let days = updateSpots(appointments);
    setState({...state, appointments, days});     
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

  let days =  updateSpots(appointments);
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then ( () => {
    setState({...state, appointments, days});      
  });
}

return {state, setDay, bookInterview, cancelInterview}

  }

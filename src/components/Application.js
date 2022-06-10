import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  //Combine all useStates into one
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  // Fetch appointments for individual day
  const appointments = getAppointmentsForDay(state, state.day);
  

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers = {interviewers}
        bookInterview= {bookInterview}
        cancelInterview ={cancelInterview}        
      />
    );
  });
  

  // Function to update the state with the new day
  const setDay = day => setState({ ...state, day });

  useEffect(()=> {
    // Fetch days, appointments data using API 
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

  },[])


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
      <section className="schedule">
        {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

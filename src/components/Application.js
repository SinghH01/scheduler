import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  //Combine all useStates into one
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // Fetch appointments for individual day
  let dailyAppointments = getAppointmentsForDay(state, state.day)

  // Function to update the state with the new day
  const setDay = day => setState({ ...state, day });

  useEffect(()=> {
    // Fetch days, appointments data using API 
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}));
    })

  },[])

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
      {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

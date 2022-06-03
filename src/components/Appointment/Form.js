import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  // Use useState to set default states of interviewer and student
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Reset function to clear value of student and interviewer useState
  function reset () {
    setStudent("");
    setInterviewer(null)
  }

  function cancel() {
    reset();
    props.onCancel()
  }



  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick ={cancel} danger >Cancel</Button>
      <Button onClick={props.onSave}confirm >Save</Button>
    </section>
  </section>
</main>
  );
} 
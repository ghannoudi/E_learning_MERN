import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import "./style.css";

function Register() {
  const [form, setForm] = useState();

  const addStudentForm = () => {
    setForm(<StudentForm />);
  };

  const addTeacherForm = () => {
    setForm(<TeacherForm />);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "380px" }}>
      <section className="heading">
 

        <div className="please">
        <p className="text-center">Register</p>
          <FaUser />
          <p> Please create an account</p>
        </div>
      </section>

      <section className="role">
        <Button variant="info" onClick={addStudentForm} className="Button">
          Student
        </Button>

        <Button variant="info" onClick={addTeacherForm} className="Button">
          Teacher
        </Button>
      </section>
      <div style={{ marginTop: "20px" }}>{form}</div>
    </div>
  );
}

export default Register;

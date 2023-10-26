import axios from "axios";
import React, { useEffect, useState } from "react";
import AddSection from "./AddSection";
import "./style.css";
function Section({ id }) {
  const [getSec, setgetSec] = useState([]);
  const [ping, setPing] = useState(false);
  const getAllSection = () => {
    axios.get(`/section/getOneSection/${id}`).then((res) => {
      setgetSec(res.data);
    });
  };

  const supprimer = (iid) => {
    axios.delete(`/section/deleteSection/${iid}`).then(
      axios.get(`/section/getOneSection/${id}`).then((res) => {
        setgetSec(res.data);
      })
    );
  };
  const [mat, setMat] = useState({});
  const getMatiere = () => {
    axios.get(`/matiere/getOneMatiere/${id}`).then((res) => {
      setMat(res.data);
    });
  };
  useEffect(() => {
    getAllSection();
    getMatiere();
  }, [ping, id]);

  return (
    <div>
      <div className="section">
        <h3>
          Name : {mat.name}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Level :{mat.name_spec}
        </h3>
        <h3></h3>
      </div>
      <div className="section">
        <div className="create">
          <AddSection id={id} ping={ping} setPing={setPing} />
        </div>
        {getSec.map((el) => (
          <div className="course">
            <button
              class="btn btn-danger delcrs"
              onClick={() => supprimer(el._id)}
            >
              Delete
            </button>
            <div className="course1">
              <h1 className="titlcrs"> {el.title}</h1>
            </div>
            <div className="date">
              <h4> {el.date && `the course will start at ${el.date}`}</h4>
            </div>

            <div className="messag">
              <p>{el.message}</p>
            </div>

            <a className="courselien" target="_blank" href={el.lien}>
              click here to access the course
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;

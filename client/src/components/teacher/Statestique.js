import axios from "axios";
import React, { useEffect, useState } from "react";

const Statestique = ({ id }) => {
  const [mat, setMat] = useState({});
  const getMatiere = () => {
    axios.get(`/matiere/getOneMatiere/${id}`).then((res) => {
      setMat(res.data);
    });
  };
  const [getSec, setgetSec] = useState([]);
  const getAllSection = () => {
    axios.get(`/section/getOneSection/${id}`).then((res) => {
      setgetSec(res.data);
    });
  };
  const [getMessage, setGetMessage] = useState([]);
  const getAllMessage = () => {
    axios.get(`/message/getOneMessage/${id}`).then((res) => {
      setGetMessage(res.data);
      console.log(res.data);
    });
  };
  const [students, setStudents] = useState([]);
  const getStudent = async () => {
    try {
      const res = await axios.get(`/matiere/getOneMatiere/${id}`);
      axios
        .get(`/user/getStudentByspec/${res.data.spec_id}`)
        .then((res) => setStudents(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatiere();
    getAllSection();
    getAllMessage();
    getStudent();
  }, [id]);
  return (
    <div className="stat">
      <h1>{mat.name}</h1>
      <h4>{mat.name_spec}</h4>
      {/* <h1>{mat.name}</h1>
      <div className="stat1">
        <h3>Level</h3>
        <img className="icon i" src="/imgs/open-book.png" />
        <h4 className="stat2">{mat.name_spec}</h4>
      </div>
      <div className="stat1">
        <img className="icon i" src="/imgs/open-book.png" />
        <p>{getSec.length}</p>

        <h1>courses</h1>
      </div>
      <div className="stat1">
        <h1>messages</h1>
        <p>{getMessage.length}</p>
      </div>
      <div className="stat1">
        <h1>student</h1>
        <p>{students.length}</p>
      </div> */}
    </div>
  );
};

export default Statestique;

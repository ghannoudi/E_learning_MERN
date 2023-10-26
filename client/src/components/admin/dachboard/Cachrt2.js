import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import "./dachboard.css";
const Cachrt2 = () => {
  const [getStudent, setGetStudent] = useState([]);

  const getAllStudent = () => {
    axios.get(`/user/getAllStudent`).then((res) => {
      setGetStudent(res.data);
    });
  };
  const [dept, setDeot] = useState([]);
  const getDept = () => {
    axios.get(`/deppartement/getAllDeppartement`).then((res) => {
      setDeot(res.data);
    });
  };
  const [getTeacher, setGetTeacher] = useState([]);
  const getAllTeacher = () => {
    axios.get(`/user/getAllTeacher`).then((res) => {
      setGetTeacher(res.data);
    });
  };
  const [getMat, setgetMat] = useState([]);
  const getAllMatiere = () => {
    axios.get(`/matiere/getAllMatiere`).then((res) => {
      setgetMat(res.data);
    });
  };
  const [getSpec, setgetSpec] = useState([]);
  const getAllSpecialite = () => {
    axios.get(`/specialite/getAllSpecialite`).then((res) => {
      setgetSpec(res.data);
    });
  };
  useEffect(() => {
    getAllTeacher();
    getAllStudent();
    getDept();
    getAllMatiere();
    getAllSpecialite();
  }, []);
  return (
    <div className="chart2">
      <div>
        <div className="carro">
          <img className="icon" src="/imgs/user.png" />

          <h3 className="nomber">{getStudent.length}</h3>
          <h3 className="name">Students</h3>
        </div>

        <div className="carro">
          <img className="icon" src="/imgs/user.png" />

          <h3 className="nomber">{getTeacher.length}</h3>
          <h3 className="name">Teacher</h3>
        </div>
        <div className="carro">
          <img className="icon" src="/imgs/portfolio.png" />
          <h3 className="nomber">{dept.length}</h3>
          <h3 className="namedep">Deppartements</h3>
        </div>

        <div className="carro">
          <img className="icon" src="/imgs/team.png" />
          <h3 className="nomber">{getSpec.length}</h3>
          <h3 className="name">Levels</h3>
        </div>
        <div className="carro">
          <img className="icon" src="/imgs/open-book.png" />
          <h3 className="nomber">{getMat.length}</h3>
          <h3 className="name">Courses</h3>
        </div>
      </div>
    </div>
  );
};

export default Cachrt2;

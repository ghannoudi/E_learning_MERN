import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
function Section({ id }) {
  const [getSec, setgetSec] = useState([]);

  const getAllSection = () => {
    axios.get(`/section/getOneSection/${id}`).then((res) => {
      setgetSec(res.data);
    });
  };

  useEffect(() => {
    getAllSection();
  }, [id]);

  return (
    <div>
      <div className="section">
        {getSec.map((el) => (
          <div className="course">
            <div className="course1">
              <h1 className="titlcrs"> {el.title}</h1>
            </div>
            <div className="messag">
              <p>{el.message}</p>
            </div>
            <a className="courselien" target="_blank" href={el.lien}>
              click here to access the course
            </a>
          </div>
        )) }
      </div>
    </div>
  );
}

export default Section;

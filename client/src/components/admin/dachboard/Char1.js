
import React from "react";
import Cachrt2 from "./Cachrt2";
import TeacherAuth from "./Chart3";
import StudebtAuth from "./Chart4";
import "./dachboard.css"

const Char1 = () => {

  return (
    <div >
        <div >
        <div>
          <Cachrt2/>
      </div>
    <div className="rondade ">
    <div className="chartTeach">
        <TeacherAuth/>
      </div>
      <div className="chartStudent">
        <StudebtAuth/>
      </div>
    </div>
      
    </div>
    </div>
  
  );
};

export default Char1;

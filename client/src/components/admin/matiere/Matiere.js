import React, { useEffect, useState } from "react";
import axios from "axios";
import EditMatiere from "./EditeMatiere";
import { FiTrash2 } from "react-icons/fi";
import "./style.css";
import AddMat from "./AddMat";
import Swal from "sweetalert2";

function Matiere() {
  const [getMat, setgetMat] = useState([]);

  const [ping, setPing] = useState(false);

  const getAllMatiere = () => {
    axios.get(`http://localhost:8080/matiere/getAllMatiere`).then((res) => {
      setgetMat(res.data);
    });
  };

  const DelMatiere = async (Matiere) => {
    Swal.fire({
      title: "Do you want to delete course?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        axios.delete(`/matiere/deleteMatiere/${Matiere}`);
        axios.get(`/matiere/getAllMatiere`).then((res) => {
          setgetMat(res.data);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    getAllMatiere();
  }, [ping]);

  return (
    <div className="mats">
      <div className="createMat">
        <AddMat ping={ping} setPing={setPing} />
      </div>

      <div>
        <h1 className="ss">Subjects</h1>
        <table id="customers">
          <thead className="thead">
            <td>name</td>
            <td>Level</td>
            <td>update</td>

            <td>delete</td>
          </thead>
          {getMat.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.name_spec}</td>
              <td style={{textAlign:"center"}}>
                <EditMatiere el={el} ping={ping} setPing={setPing} />
              </td>
              <td style={{textAlign:"center"}}>
                <a className="delete" onClick={() => DelMatiere(el._id)}>
                  <FiTrash2 />
                </a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Matiere;

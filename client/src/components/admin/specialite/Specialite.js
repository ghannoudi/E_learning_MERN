import React, { useEffect, useState } from "react";
import axios from "axios";
import EditSpecialite from "./EditeSpecialite";

import { FiTrash2 } from "react-icons/fi";
import "./style.css";
import AddDpecialite from "./AddDpecialite";
import Swal from "sweetalert2";
function Specialite() {
  const [getSpec, setgetSpec] = useState([]);
  const [ping, setPing] = useState(false);

  const getAllSpecialite = () => {
    axios.get(`/specialite/getAllSpecialite`).then((res) => {
      setgetSpec(res.data);
    });
  };

  const DelSpecialite = async (specialite) => {
    Swal.fire({
      title: "Do you want to delete level? all the subjects in this level will deleted also",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        axios.delete(`/specialite/deleteSpecialite/${specialite}`);
        axios.delete(`/matiere/deleteManyMatiere/${specialite}`);
        getAllSpecialite();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    getAllSpecialite();
  }, [ping]);

  return (
    <div className="specs">
      <div className="createSpec">
        <AddDpecialite ping={ping} setPing={setPing} />
      </div>

      <div>
        <h1 className="ss">Levels</h1>
        <table id="customers">
          <thead className="thead">
            <td>Name</td>
            <td>Deppartement</td>

            <td>Update</td>
            <td>Delate</td>
          </thead>

          {getSpec.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.name_dept}</td>

              <td style={{textAlign:"center"}}>
                <EditSpecialite el={el} ping={ping} setPing={setPing} />
              </td>
              <td style={{textAlign:"center"}}>
                <a className="delete" onClick={() => DelSpecialite(el._id)}>
                  <FiTrash2 className="delete" />
                </a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Specialite;

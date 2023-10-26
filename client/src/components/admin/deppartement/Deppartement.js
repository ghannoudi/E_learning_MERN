import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import AddDept from "./AddDept";
import EditDeppartement from "./EditDeppartement";
import "./style.css";

const GetDept = () => {
  const [getDept, setGetDept] = useState([]);
  const [ping, setPing] = useState(false);

  const getAllDeppartement = () => {
    axios.get(`/deppartement/getAllDeppartement`).then((res) => {
      setGetDept(res.data);
    });
  };
  // const [spec, setSpec] = useState([]);
  const del = async (deppartement) => {
    Swal.fire({
      title: "Do you want to delete deppartement?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire("Saved!", "", "success");
        axios.delete(`/deppartement/deleteDeppartement/${deppartement}`);
        getAllDeppartement();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const DelDeppartement = async (deppartement) => {
  const res= await axios.get(`/specialite/getSpecialite/${deppartement}`)
  
   
    if (res.data.length > 0) {
      
    await  Swal.fire("this deppartement has levels you can not delete it ");
    } else {
      del(deppartement);
    }
  };

  useEffect(() => {
    getAllDeppartement();

  }, [ping]);

  return (
    <div className="depts">
      <div className="createDept">
        <AddDept ping={ping} setPing={setPing} />
      </div>

      <div>
        <h1 className="ss">Deppartements</h1>
        <table id="customers">
          <thead className="thead">
            <td>Name</td>
            <td>Update</td>
            <td>Delete</td>
          </thead>
          {getDept.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td style={{ textAlign: "center" }}>
                <EditDeppartement el={el} />
              </td>
              <td style={{ textAlign: "center" }}>
                <a
                  onClick={() => {
                    DelDeppartement(el._id);
                  }}
                >
                  <FiTrash2 className="delete" />
                </a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default GetDept;

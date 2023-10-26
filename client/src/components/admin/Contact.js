import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const Contact = () => {
  const [mes, setMes] = useState([]);
  const getMessage = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/message/allMess`);
      setMes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const DelMes= async (id)=>{

    try {
      Swal.fire({
        title: "Do you want to delete message?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          axios.delete(`/api/message/delmess/${id}`);
          getMessage()
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
        
        
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getMessage();
  });
  return (
    <div className="students">
      <table id="customers">
        <thead className="thead">
          <td>name</td>
          <td>Email</td>
          <td>Message</td>
          <td>Delate</td>
        </thead>
        
          {mes.map((el) => (
              <tr>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.message}</td>
            <td>
            <a onClick={() => DelMes(el._id)} >
                  <FiTrash2 className="delete"/>
                </a>
            </td>
            </tr>
          ))}
        
      </table>
    </div>
  );
};

export default Contact;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import UpdateMat from "./UpdateMat";
import Swal from 'sweetalert2'
import { FiTrash2 } from "react-icons/fi";

function Teacher() {
  const [getTeacher, setGetTeacher] = useState([]);
  const getAllTeacher = () => {
    axios.get(`/user/getAllTeacher`).then((res) => {
      setGetTeacher(res.data);
    });
  };
  const handleUpdate = (id, user) => {
    axios.put(`/user/editUser/${id}`, user);
    getAllTeacher();
  };
  const handleDel = async (iid) => {
    Swal.fire({
      title: 'Do you want to delete teacher?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire('Teacher deleted!', '', 'success')
        axios
        .delete(`/user/deleteUser/${iid}`)
        getAllTeacher();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  };
  useEffect(() => {
    getAllTeacher();
  }, []);
  return (
    <div>
      <div className="teachers">
        <h1 className="ss">Teachers</h1>
        <table id="customers">
          <thead className="thead">
            <td>Full name</td>
            <td>Email</td>
            <td>ICN</td>
            <td>Phone number</td>
            <td>Status</td>
            <td>Action</td>
            <td>subjects list</td>
            <td>Delete</td>
          </thead>
          {getTeacher.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.cin}</td>
              <td>{el.tel}</td>
              <td>{el.isAuth ? "active " : "blocked "}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => handleUpdate(el._id, { isAuth: !el.isAuth })}
                >
                  {el.isAuth ? "Block" : "Active"}
                </button>
              </td>
              <td style={{textAlign:"center"}}><UpdateMat mat={el.mat_id} id={el._id}/></td>
              <td><a onClick={()=>handleDel(el._id)} className="delete"><FiTrash2 /></a></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Teacher;

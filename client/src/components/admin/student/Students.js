import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import "../deppartement/style.css";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import UpdateLevel from "./UpdateLevel";
function Students() {
  const [getStudent, setGetStudent] = useState([]);

  const getAllStudent = () => {
    axios.get(`/user/getAllStudent`).then((res) => {
      setGetStudent(res.data);
    });
  };
  const handleUpdate = (id, user) => {
    axios.put(`/user/editUser/${id}`, user);
    getAllStudent();
  };
  const handleDel = async (iid) => {
    Swal.fire({
      title: "Do you want to delete student?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Student deleted ", "", "success");
        axios.delete(`/user/deleteUser/${iid}`)
        axios.delete(`/msg/deleteMesgStudentbyidst/${iid}`)
        axios.delete(`/note/deleteNotebyst/${iid}`)
        getAllStudent();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    getAllStudent();
  }, []);
  return (
    <div>
      <div className="students">
        <h1 className="ss">Students</h1>
        <table id="customers">
          <thead className="thead">
            <td>Full name</td>
            <td>Email</td>
            <td>ICN</td>
            <td>Phone number</td>
            <td>Update level</td>
            <td>Status</td>
            <td> Delete </td>
            <td>Action</td>
          </thead>
          {getStudent.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.cin}</td>
              <td>{el.tel}</td>
              <td style={{ textAlign: "center" }} className="delete">
                <UpdateLevel id={el._id} spec_id={el.spec_id} />
              </td>
              <td style={{ textAlign: "center" }}>
                <a onClick={() => handleDel(el._id)} className="delete">
                  <FiTrash2 />
                </a>
              </td>
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
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Students;

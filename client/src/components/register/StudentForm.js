import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./style.css";

function StudentForm() {
  const [getDept, setGetDept] = useState([]);

  const [dept, setDept] = useState();

  const [getSpec, setgetSpec] = useState([]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    cin: "",
    tel: "",
    password: "",
    dept_id: 0,
    spec_id: 0,
    role: "student",
    photo: "",
    isStudent: true,
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    const { data } = await axios.post("/api/upload", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setUser({ ...user, photo: data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/user/register`, user);
      console.log(user);

      Swal.fire("Good job!", "acount created successfully", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      }
    }
  };

  const getAllDeppartement = () => {
    axios
      .get(`http://localhost:8080/deppartement/getAllDeppartement`)
      .then((res) => {
        setGetDept(res.data);
      });
  };

  const getAllSpecialite = () => {
    axios
      .get(`http://localhost:8080/specialite/getAllSpecialite`)
      .then((res) => {
        setgetSpec(res.data);
      });
  };

  useEffect(() => {
    getAllDeppartement();
    getAllSpecialite();
  }, []);
  return (
    <div className="left">
      <form className="form_container shadow " onSubmit={handleSubmit}>
        <div className="part">
          <div className="part1">
            <input
              className="input"
              type="text"
              placeholder=" Full name"
              name="name"
              required
              minLength="3"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="ICN"
              name="cin"
              required
              onChange={(e) => setUser({ ...user, cin: e.target.value })}
              min="8"
            />
            <select
              aria-label="Default select example"
              onChange={(e) => {
                setDept(e.target.value);
                setUser({ ...user, dept_id: e.target.value });
              }}
              required
              className="input"
            >
              <option value="">Select your deppartement</option>
              {getDept.map((el) => (
                <option value={el._id}>{el.name}</option>
              ))}
            </select>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="input"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              minLength="6"
            />
          </div>

          <div className="part2">
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="Mobile number"
              name="mobile"
              required
              onChange={(e) => setUser({ ...user, tel: e.target.value })}
              minLength="8"
            />

            <select
              aria-label="Default select example"
              required
              onChange={(e) => {
                setUser({ ...user, spec_id: e.target.value });
              }}
              className="input"
            >
              <option value="">Select your level</option>

              {getSpec
                .filter((el) => el.dept_id === dept)
                .map((el) => (
                  <option value={el._id}>{el.name}</option>
                ))}
            </select>

            <input
              className="input fileee "
              type="file"
              onChange={(e) => uploadFileHandler(e)}
           
            />
          </div>
        </div>

        {error && <div className="error_msg">{error}</div>}

        <button type="submit" className="green_btn">
          Sing In
        </button>
      </form>
    </div>
  );
}
export default StudentForm;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
function StudentForm() {
  const navigate = useNavigate();
  const [getMat, setgetMat] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cin, setCin] = useState("");
  const [password, setPasword] = useState("");
  const [tel, setTel] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("teacher");
  const [isTeacher, setIsTeacher] = useState(true);
  const [mat_id, setPersonName] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      tel,
      cin,
      photo,
      role,
      isTeacher,
      mat_id,
    };
    try {
      await axios.post(`/user/register`, user);
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    const { data } = await axios.post("/api/upload", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setPhoto(data);
  };
  const getAllMatiere = () => {
    axios.get(`/matiere/getAllMatiere`).then((res) => {
      setgetMat(res.data);
    });
  };
  const [matFinal, setMatFinal] = useState([]);
  const matTech = [];
  const getTeacher = async () => {
    try {
      const t = await axios.get("/user/getAllTeacherAuth");
      const tTech = t.data.map((el) => el.mat_id);
      tTech?.map((element) => {
        element.map((el) => matTech.push(el));
      });
      const h = getMat?.filter((el) => !matTech?.includes(el._id));
      setMatFinal(h);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMatiere();
    getTeacher();
  }, [getMat.length, matFinal.length]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
     
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="left">
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="part">
          <div className="part1">
            <input
              className="input"
              type="text"
              placeholder="Full name"
              name="name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="input"
              type="number"
              placeholder="ICN"
              name="cin"
              required
              onChange={(e) => {
                setCin(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="input"
              onChange={(e) => {
                setPasword(e.target.value);
              }}
            />
          </div>
          <div className="part2">
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              className="input"
              type="number"
              placeholder="Mobile number"
              name="mobile"
              required
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
            <input
              className="input fileee"
              type="file"
              onChange={(e) => uploadFileHandler(e)}
            />
          </div>
        </div>

        <div className="part3">
          <Select
            raquired
            className="file"
            multiple
            displayEmpty
            value={mat_id}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select your subjects</em>;
              }
              return "Update your subjects";
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>select your subjects</em>
            </MenuItem>
            {matFinal?.map((el, index) => (
              <MenuItem
                key={index}
                value={el._id}
                style={getStyles(el.name, mat_id, theme)}
              >
                {el.name}({el.name_spec})
              </MenuItem>
            ))}
          </Select>
        </div>

        <button type="submit" className="green_btn">
          Sing In
        </button>
      </form>
    </div>
  );
}
export default StudentForm;

import Select from "@mui/material/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

const UpdateMat = ({ mat, id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allMat, setAllMat] = useState([]);
  const [teacher, setTeacher] = useState({});

  const getAllMat = async () => {
    try {
      await axios
        .get(`/matiere/getAllMatiere`)
        .then((res) => setAllMat(res.data));
      await axios
        .get(`/user/getOneTeacher/${id}`)
        .then((res) => setTeacher(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const [matEtudier, setMatEtudier] = useState([]);
  const compare = () => {
    const t = allMat?.filter((el) => mat?.includes(el._id));
    setMatEtudier(t);
  };

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
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = () => {
    try {
      axios.put(`/user/editUser/${id}`, { mat_id: personName });
      console.log(teacher);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMat();
    compare();
  }, [mat.length, allMat.length]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update subjects </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {matEtudier.map((el) => (
            <div className="form-control">{el.name}({el.name_spec})</div>
          ))}
          <br></br>
          <label className="form-label">select subjects</label>
          <Select
            className="form-select"
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            MenuProps={MenuProps}
          >
          
            {allMat.map((name) => (
              <MenuItem
                key={name.name}
                value={name._id}
                style={getStyles(name, personName, theme)}
              >
                {name.name}<span>({name.name_spec})</span>
              </MenuItem>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleClose();
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateMat;

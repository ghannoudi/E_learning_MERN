import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

const AddDpecialite = ({ ping, setPing }) => {
  const [error, setError] = useState("");
  const [getDept, setGetDept] = useState([]);
  const [addSpec, setAddSpec] = useState({
    name: "",
    dept_id: "",
    name_dept: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setError("")
    setShow(true)
  };
  const handleAddSpec = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/specialite/newSpecialite`, addSpec);
      handleClose();
      setPing(!ping);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const getAllDeppartement = () => {
    axios.get(`/deppartement/getAllDeppartement`).then((res) => {
      setGetDept(res.data);
    });
  };
  const getDeppartement = async (dept_id) => {
    try {
      const res = await axios.get(
        `/deppartement/getOneDeppartement/${dept_id}`
      );

      setAddSpec({ ...addSpec, name_dept: res.data.dept.name.toString() });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDeppartement();
    getDeppartement(addSpec.dept_id);
  }, [ping, addSpec.dept_id]);
  return (
    <div>
      <button onClick={handleShow} className="btn btn-success">
        <FiPlus /> Create Level
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name</label>
          <input
            placeholder="level + speciality (exemple 1er IAG)"
            required
            className="form-control"
            type="text"
            onChange={(e) => {
              setAddSpec({ ...addSpec, name: e.target.value });
            }}
          />
          <br></br>
          <select
            required
            className="form-control"
            onChange={(e) => {
              setAddSpec({ ...addSpec, dept_id: e.target.value });
            }}
          >
            <option>select a deppartement</option>
            {getDept.map((el) => (
              <option value={el._id}>{el.name}</option>
            ))}
          </select>
          <br></br>

          {error && <div className="error_msg">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              handleAddSpec();
            
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              addSpec.name.replace(/\s+/g, "") && addSpec.dept_id && addSpec.name.trim().length > 5 ? false : true
            }
            onClick={(e) => {
             
      
              handleAddSpec(e);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddDpecialite;

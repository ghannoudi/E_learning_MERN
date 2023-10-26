import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import "./style.css";

const EditSpecialite = ({ el, setPing, ping }) => {
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getDept, setGetDept] = useState([]);

  const [addSpec, setAddSpec] = useState({
    name: "",
    dept_id: "",
    name_dept: "",
  });

  const getAllDeppartement = () => {
    axios.get(`/deppartement/getAllDeppartement`).then((res) => {
      setGetDept(res.data);
    });
  };
  const getDeppartement = async (deptid) => {
    try {
      const res = await axios.get(`/deppartement/getOneDeppartement/${deptid}`);
      setAddSpec({ ...addSpec, name_dept: res.data.dept.name.toString() });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdite = async () => {
    console.log(addSpec);
    try {
      await axios.put(`/specialite/editSpecialite/${addSpec._id}`, addSpec);
      setPing(!ping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddSpec(el);
    getAllDeppartement();
  }, [el]);

  useEffect(() => {
    getDeppartement(addSpec?.dept_id);
  }, [addSpec.dept_id]);

  return (
    <>
      <a onClick={handleShow} className="atobtn">
        <FiEdit className="delete" />
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>updating level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="col-form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={addSpec?.name}
            onChange={(e) => setAddSpec({ ...addSpec, name: e.target.value })}
          />
          <label className="col-form-label">select a deppartement</label>
          <select
         
            className="form-select form-select-lg mb-3"
            value={addSpec.dept_id}
            onChange={(e) =>
              setAddSpec({ ...addSpec, dept_id: e.target.value })
            }
           
          >
          
            {getDept.map((el) => (
              <option value={el._id}>{el.name}</option>
            ))}
          </select>
          {error && <div className="error_msg">{error}</div>}
        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleEdite();
            }}
            disabled={addSpec.name.replace(/\s+/g, "")  ? false : true}
          >
            Save Changes
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  );
};

export default EditSpecialite;

import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

const AddDept = ({ ping, setPing }) => {
  const [error, setError] = useState("");
  const [add, setAdd] = useState({ name: "" });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setError("");
    setShow(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/deppartement/newDeppartement`, add);
      setPing(!ping);
      handleClose();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleShow} className="btn btn-success">
        <FiPlus /> Create deppartement
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New deppartement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name</label>
          <input
            required
            className="form-control"
            type="text"
            onChange={(e) => setAdd({ ...add, name: e.target.value })}
          />
          {error && <div className="error_msg">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={add.name.trim().length > 3 ? false : true}
            onClick={(e) => {
              handleAdd(e);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddDept;

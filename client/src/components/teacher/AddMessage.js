import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
function AddMessage({ id, ping, setPing }) {
  const [addMes, setAddMes] = useState({
    name: "",
    date: "",
    mat_id: id,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setAddMes({ ...addMes, mat_id: id });
  };

  const handleAddMes = async (e) => {
    await axios
      .post(`/message/newMessage`, addMes)
      .then((res) => console.log(res));

    setPing(!ping);
  };

  return (
    <div>
      <button onClick={handleShow} className="btn btn-success create">
        Write a message
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            type="text"
            onChange={(e) =>
              setAddMes({
                ...addMes,
                name: e.target.value,
                date: new Date().toLocaleString(),
              })
            }
          ></textarea>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}

          <button
            disabled={addMes.name.trim().replace(/\s+/g, "") ? false : true}
            type="button"
            onClick={() => {
              handleClose();
              handleAddMes();
            }}
            className="btn btn-outline-primary rounded-pill px-4"
          >
            Send Message
            <i className="fa fa-paper-plane ms-2"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddMessage;

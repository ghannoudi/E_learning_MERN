import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
function AddSection({ id, ping, setPing }) {
  const [addSection, setAddSection] = useState({
    title: "",
    message: "",
    date: "",
    lien: "",
    mat_id:"",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setAddSection({ ...addSection, message: "", date: "",mat_id:id });
  };
  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }
  const [err, setErr] = useState("");
  const handleAddSec = async () => {
   
    setErr(" ");
    if (isValidURL(addSection.lien)) {
     
      await axios
      .post(`/section/newSection`, addSection)
      .then((res) => console.log(res));
      Swal.fire("Good job!", "Course added!", "success");

      setPing(!ping);
      handleClose();
    } else {
      setErr("URL not valid");
    }
  };
  useEffect(() => {
  }, [id]);
  return (
    <div>
      <button
        onClick={() => {
          handleShow();
          setErr(" ");
        }}
        className="btn btn-success create"
      >
        create course
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>create a course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Title</label>
          <input
            required
            className="form-control"
            type="text"
            onChange={(e) =>
              setAddSection({ ...addSection, title: e.target.value })
             
            }
          />

          <label>Date</label>
          <input
            className="form-control"
            type="datetime-local"
            onChange={(e) =>
              setAddSection({ ...addSection, date: e.target.value })
            }
          />

          <label>Description</label>
          <textarea
            className="form-control"
            type="text"
            onChange={(e) =>
              setAddSection({ ...addSection, message: e.target.value })
              
            }
          ></textarea>

          <label>url</label>
          <input
            required
            pattern=".*\.[a-z]{2,}$"
            className="form-control"
            type="url"
            onChange={(e) => {
              setAddSection({ ...addSection, lien: e.target.value });
              
              setErr("");
            }}
          />
          {err.length > 5 ? <div className="errUrl">{err}</div> : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={
              addSection.title.length > 2 && addSection.lien ? false : true
            }
            variant="primary"
            onClick={() => {
              // handleClose();
              handleAddSec();
            }}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddSection;

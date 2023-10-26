import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

const UpdateLevel = ({ id, spec_id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [spec, setSpec] = useState({});

  const [allspec, setAllspec] = useState([]);
  const getAllSpecialite = () => {
    axios.get(`/specialite/getAllSpecialite`).then((res) => {
      setAllspec(res.data);
    });
  };
  const [user, setUser] = useState({});
  const getUser = () => {
    axios.get(`/user/getOneUser/${id}`).then((res) => {
      setUser(res.data);
    });
  };
  const getSpecialite = () => {
    axios.get(`/specialite/getOneSpecialite/${spec_id}`).then((res) => {
      setSpec(res.data.spec);
    });
  };
  const handleUpdate = () => {
    axios.put(`/user/editUser/${id}/`, user);
    window.location.reload();
  };
  const [getDept, setGetDept] = useState([]);
  const [dept, setDept] = useState();

  const getAllDeppartement = () => {
    axios
      .get(`http://localhost:8080/deppartement/getAllDeppartement`)
      .then((res) => {
        setGetDept(res.data);
      });
  };
  const [d,setD] = useState(false)
  useEffect(() => {
    getSpecialite();
    getAllSpecialite();
    getUser();
    getAllDeppartement();
  }, []);

  return (
    <div>
      <>
        <a onClick={handleShow} className="atobtn">
          <FiEdit className="delete" />
        </a>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {spec.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              aria-label="Default select example"
              onChange={(e) => {
                setDept(e.target.value);
                setUser({ ...user, dept_id: e.target.value });
              }}
              required
              className="input"
            >
              <option value="">Select a deppartement</option>
              {getDept.map((el) => (
                <option value={el._id}>{el.name}</option>
              ))}
            </select>

            <select
              className="input"
              onChange={(e) => {setUser({ ...user, spec_id: e.target.value });setD(true)}}
            >
              <option value="">Select a level</option>
              {allspec
                .filter((el) => el.dept_id === dept)
                .map((el) => (
                  <option value={el._id}>{el.name}</option>
                ))}
            </select>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
                  disabled={d  ? false : true}
              variant="primary"
              onClick={() => {
                handleClose();
                handleUpdate();
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UpdateLevel;

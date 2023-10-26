import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

const AddMat = ({ ping, setPing }) => {
  const [addMat, setAddMat] = useState({
    name: "",
    spec_id: "",
    name_spec: "",
  });
  const [getSpec, setGetSpec] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getAllSpecialite = () => {
    axios
      .get(`http://localhost:8080/specialite/getAllSpecialite`)
      .then((res) => {
        setGetSpec(res.data);
      });
  };
  const handleAddMat = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`/matiere/newMatiere`, addMat)
        .then((res) => console.log(res));
      setPing(!ping);
    } catch (error) {
      console.log(error);
    }
  };
  const getSpecialite = async (spec_id) => {
    try {
      const res = await axios.get(`/specialite/getOneSpecialite/${spec_id}`);

      setAddMat({ ...addMat, name_spec: res.data.spec.name.toString() });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSpecialite();
    getSpecialite(addMat.spec_id);
  }, [ping, addMat.spec_id]);
  return (
    <div>
      <button onClick={handleShow} className="btn btn-success">
        <FiPlus /> Create subject
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <h1>Add new subject</h1>
          {/* <Modal.Title>New subject</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <form className="ajouter" onSubmit={handleAddMat}>
         
            <label for="mat">Name</label>
            <input
              type="text"
              name="mat"
              onChange={(e) => setAddMat({ ...addMat, name: e.target.value })}
              className="form-control"
              required
            />
            <br></br>
            <label>Levels</label>
            <select
              required
              onChange={(e) =>
                setAddMat({ ...addMat, spec_id: e.target.value })
              }
              className="form-control"
            >
              <option Value="">select a level</option>
              {getSpec.map((el) => (
                <option value={el._id}>{el.name}</option>
              ))}
            </select>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={
              addMat.name.replace(/\s+/g, "") && addMat.spec_id && addMat.name.trim().length > 2  ? false : true
            }
            onClick={(e) => {
              handleClose();
              handleAddMat(e);
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMat;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";

const EditMatiere = ({ el, setPing, ping }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getSpec, setGetSpec] = useState([]);

  const [addMat, setAddMat] = useState({
    name: "",
    spec_id: "",
    name_spec: "",
  });

  const getAllSpecialite = () => {
    axios.get(`/specialite/getAllSpecialite`).then((res) => {
      setGetSpec(res.data);
    });
  };
  const getSpecialite = async (specid) => {
    try {
      const res = await axios.get(`/specialite/getOneSpecialite/${specid}`);
      setAddMat({ ...addMat, name_spec: res.data.spec.name.toString() });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdite = async () => {
    try {
      await axios.put(`/matiere/editMatiere/${addMat._id}`, addMat);
      setPing(!ping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddMat(el);
    getAllSpecialite();
  }, [el]);

  useEffect(() => {
    getSpecialite(addMat?.spec_id);
  }, [addMat.spec_id]);
  console.log(getSpec);

  return (
    <>
      <a onClick={handleShow} className="delete">
        <FiEdit />
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>updating course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

     <label className="col-form-label">name</label>
   
        <input
        required
         className="form-control"
            type="text"
            value={addMat?.name}
            onChange={(e) => setAddMat({ ...addMat, name: e.target.value })}
          />

     
      <label className="col-form-label">Level</label>
     
      <select
      className="form-select form-select-lg mb-3"
            value={addMat.spec_id}
            onChange={(e) =>
              setAddMat({ ...addMat, spec_id: e.target.value })
            }
          >
            {getSpec.map((el) => (
              <option value={el._id}>{el.name}</option>
            ))}
          </select>
      
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
            disabled={addMat.name.replace(/\s+/g, "") ? false : true}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditMatiere;

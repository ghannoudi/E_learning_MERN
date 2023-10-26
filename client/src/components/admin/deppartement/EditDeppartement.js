import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi';
import "./style.css"

const EditDeppartement = ({el,ping,setPing}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dept, setDept] = useState({name:""})

  useEffect(()=>{
   setDept(el)

  },[el])
  const handleEdite =()=>{
    axios.put(`/Deppartement/editDeppartement/${el._id}`,dept)
    window.location.reload()
  }

  return (
   <>
 
 <a  className="delete" onClick={handleShow} >
       <FiEdit />
        </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update deppartement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>
         <label className='form-label'>Name</label>
         </div>
          <input className='form-control' type="text" value={dept?.name} onChange={(e)=>setDept({...dept,name:e.target.value})}/>
         
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose();handleEdite()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditDeppartement
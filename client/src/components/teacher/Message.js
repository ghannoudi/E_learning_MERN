import axios from "axios";
import React, { useEffect, useState } from "react";
import AddMessage from "./AddMessage";
import { FiMail } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

function Message({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ping, setPing] = useState(false);
  const [getMessage, setGetMessage] = useState([]);
  const [students, setStudents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    not: "",
    mat_id: id,
    student_id: "",
  });
  const getAllMessage = () => {
    axios.get(`/message/getOneMessage/${id}`).then((res) => {
      setGetMessage(res.data);
      console.log(res.data);
    });
  };

  const supprimer = (iid) => {
    axios.delete(`/message/deleteMessage/${iid}`).then(
      axios.get(`/message/getOneMessage/${id}`).then((res) => {
        setGetMessage(res.data);
      })
    );
  };
  const getSpecialite = async () => {
    try {
      const res = await axios.get(`/matiere/getOneMatiere/${id}`);
      axios
        .get(`/user/getStudentByspecAuth/${res.data.spec_id}`)
        .then((res) => setStudents(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const submitNote = async (e) => {
    e.preventDefault();
    try {
      if (note.not > 20 || note.not < 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid mark",
       
        });
      } else {
        await axios.post("/note/newNote", note);
      }

      getNote();
    } catch (error) {
      console.log(error);
    }
  };

  const getNote = async () => {
    await axios.get(`/note/getNotemat/${id}`).then((res) => setNotes(res.data));
  };

  const [updateNote, setUpdateNote] = useState({
    not: "",
  });

  const upNote = async (iddd) => {
    try {
      if(updateNote?.not<0 || updateNote?.not>20 ){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid mark",
        
        });
      }
      else{
        await axios.put(`/note/editNote/${iddd}`, updateNote);
        getNote();
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  const [stMsg, setStMsg] = useState([]);
  const getMsgSt = async (iddd) => {
    try {
      await axios
        .get(`/msg/getOneMesgStudent/${iddd}/${id}`)
        .then((res) => setStMsg(res.data));
      setPing(!ping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessage();
    getSpecialite();
    getNote();
  }, [ping, id, students.length]);
  return (
    <div>
      <div className="message">
        <div>
          <AddMessage id={id} ping={ping} setPing={setPing} />
        </div>
        {getMessage.map((el) => (
          <div>
            <p>{el.date}</p>
            <div>
              <p>{el.name}</p>
            </div>

            <button class="btn btn-danger" onClick={() => supprimer(el._id)}>
              Delete
            </button>
            <hr></hr>
          </div>
        ))}
        <table id="customers">
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Actions</th>
            <th>Messages</th>
          </thead>
          {students?.map((el, index) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              {notes[index]?.student_id === el._id ? (
                <>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        setUpdateNote({
                          ...updateNote,
                          not: e.target.value,
                        })
                      }
                      placeholder={notes[index]?.not}
                    />
                  </td>
                  <td>
                    <button
                     disabled={updateNote.not ? false : true}
                      className="btn btn-success"
                      onClick={() => upNote(notes[index]._id)}
                    >
                      update
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        setNote({
                          ...note,
                          student_id: el?._id,
                          not: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <button
                      disabled={note.not ? false : true}
                    className="btn btn-primary" onClick={submitNote}>
                      Add
                    </button>
                  </td>
                </>
              )}
              <td>
                <>
                  <Button
                    onClick={() => {
                      getMsgSt(el._id);
                      handleShow();
                    }}
                  >
                    <FiMail />
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {stMsg.map((el) => (
                        <div>
                          <p>{el.date}</p>
                          <p>{el.name}</p>
                          <hr></hr>
                        </div>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Message;

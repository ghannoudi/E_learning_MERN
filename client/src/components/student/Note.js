import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Modal } from "react-bootstrap";
import { CurrentUser } from "../../api/UserApi";
const Note = ({ id }) => {
  const [note, setNote] = useState();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNote("");
    setShow(true);
  };
  const getNote = async () => {
    const res = await axios
      .get(`/note/getOneNote/${user._id}/${id}`)
      .then((res) => {
        setNote(res.data[0].not);
      });
    console.log(note);
  };
  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };
  useEffect(() => {
    isUser();
    getNote();
  }, [user._id, id, note]);
  return (
    <>
      <a onClick={handleShow}>
        <img className="studentNote" src="/imgs/Results.jpg" alt="" />
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {note > -1 && note.length>0 ? (
            <div className="markecontainer">
              <h2>
                your mark in this subject is <br></br>
                <p className="noteeee">{note}</p>
              </h2>

              {note < 10  && (
                <h4>
                  hile getting a bad grade on your exam can be devastating, you
                  should not be discouraged. These kinds of situations are part
                  of the daily life of thousands of students around the world.
                  The important thing in any way is to learn from the experience
                  and draw up new goals for the future.
                </h4>
              )}
              {note > 10 && (
                <h4>Congratulations {user.name} and continued success!</h4>
              )}
              {note==10 && <h4>
                  you can do better
                  <br></br>
                  The best things you can do is to think big, set yourself new goals
                  </h4>}
            </div>
          ) : (
            <div>
              <h3>the teacher did not apply a mark in this subject</h3>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Note;

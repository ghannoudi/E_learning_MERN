import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CurrentUser } from "../../api/UserApi";
import moment from "moment";
import "./style.css";
import { FiTrash2 } from "react-icons/fi";
function AddMsg({ id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNote(" ");
    setShow(true);
  };
  const [user, setUser] = useState({});

  const [addMes, setAddMes] = useState({
    name: "",
    date: "",
    mat_id: "",
    student_id: "",
  });
  const [allMsg, setAllMsg] = useState([]);
  const getMsg = async () => {
    try {
      await axios
        .get(`/msg/getOneMesgStudent/${user?._id}/${id}`)
        .then((res) => {
          setAllMsg(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [note, setNote] = useState("");
  const handleAddMes = async () => {
    try {
      await axios.post(`/msg/newMesgStudent/`, addMes);
      getMsg();
    } catch (error) {
      console.log(error);
    }
  };
  const handledel = async (idms) => {
    try {
      await axios.delete(`/msg/deleteMesgStudent/${idms}`);
      getMsg();
    } catch (error) {
      console.log(error);
    }
  };

  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };

  const getNote = async () => {
    const res = await axios
      .get(`/note/getOneNote/${user._id}/${id}`)
      .then((res) => {
        setNote(res.data[0].not);
      });
  };
  useEffect(() => {
    isUser();
    getMsg();
    getNote();
  }, [user._id, id, note]);

  return (
    <>
      <a onClick={handleShow}>
        <img className="studentMgs" src="/imgs/message.webp" alt="" />
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Send a message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="stMsgModel">
          <div>
            {allMsg?.map((el) => (
              <>
                <div className="modelmsg">
                  <div>{el.date}</div>

                  <p>{el.name}</p>
                  <button
                    onClick={() => handledel(el._id)}
                    className="btn btn-danger deletemsg"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <textarea
            className="addmodelmsg"
            cols="20"
            rows="2"
            value={addMes.name}
            onChange={(e) =>
              setAddMes({
                ...addMes,
                name: e.target.value,
                mat_id: id,
                date: moment().format("DD-MM-YYYY hh:mm:ss"),
                student_id: user._id,
              })
            }
          ></textarea>
          <button
            disabled={addMes.name.trim().length > 0 ? false : true}
            type="button"
            onClick={() => {
              handleAddMes();
              setAddMes({...addMes,name:""})
            
            }}
            className="btn btn-outline-primary rounded-pill px-4"
          >
            Send Message
            <i className="fa fa-paper-plane ms-2"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMsg;

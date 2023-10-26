import axios from "axios";
import React, { useEffect, useState } from "react";
import { CurrentUser } from "../../api/UserApi";

function Message({ id }) {
  const [getMessage, setGetMessage] = useState([]);
  const getAllMessage = () => {
    axios.get(`/message/getOneMessage/${id}`).then((res) => {
      setGetMessage(res.data);
     
    });
  };
  const [user, setUser] = useState({});

  

  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };

  useEffect(() => {
    getAllMessage();
    isUser();
    // getNote();
  }, [id, user._id]);

  return (
    <div>
      <div className="message">
        <div className="create"></div>
        {getMessage.length > 0 &&
          getMessage.map((el) => (
            <div>
              <p>{el.date}</p>
              <h4> {el.name}</h4>
              <hr></hr>
            </div>
          ))}
      </div>
      {/* <div className="message">{note}</div> */}
    </div>
  );
}

export default Message;

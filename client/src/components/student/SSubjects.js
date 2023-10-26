import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiBook } from "react-icons/fi";
import { Menu, MenuItem, ProSidebar, SidebarContent } from "react-pro-sidebar";
import { CurrentUser } from "../../api/UserApi";
import Message from "./Message";
import Section from "./Section";
import SHeader from "./SHeader";
import "./style.css";
import AddMsg from "./AddMsg";
import SDefaultSection from "./SDefaultSection";
import Note from "./Note";

const SSubjects = () => {
  const [user, setUser] = useState({});
  const [listMat, setListMat] = useState([]);
  const [section, setSection] = useState(<SDefaultSection/>);
  const [mess, setMes] = useState();
  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };
  const getAllMatiere = async (id) => {
    try {
      const { data } = await axios.get(`/matiere/getMatiere/${id}`);
      setListMat(data);
    } catch (error) {
      console.log(error);
    }
  };
const [note,setNote] = useState();
  const [msgStudent, setMsgStudent] = useState();
  const handleSubmit = (id) => {
    setMsgStudent(<AddMsg id={id} />);
    setSection(<Section id={id} />);
    setMes(<Message id={id} />);
    setNote(<Note  id={id}/>)
  };

  useEffect(() => {
    isUser();
    getAllMatiere(user.spec_id);
  }, [user.spec_id]);
  return (
    <div>
      <div>
        <SHeader />
      </div>
      <div>
        <div className="Sside">
          <ProSidebar>
            <SidebarContent>
              <Menu iconShape="square">
                { listMat.map((el) => (
                  <MenuItem icon={<FiBook />}>
                    <a className="items" onClick={() => {handleSubmit(el._id)}}>
                      {el.name}
                    </a>
                  </MenuItem>
                ))}
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </div>
        <div>
          {section}
          {msgStudent}
   
          {mess}
        </div>
        {note}
      </div>
    </div>
  );
};

export default SSubjects;

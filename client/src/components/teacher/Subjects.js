import axios from "axios";
import React, { useEffect, useState } from "react";
import Section from "./Section";
import { CurrentUser } from "../../api/UserApi";
import "./style.css";
import Message from "./Message";
import { Menu, MenuItem, ProSidebar, SidebarContent } from "react-pro-sidebar";
import { FiBook } from "react-icons/fi";
import Header from "./Header";
import DefaultSection from "./DefaultSection";

const Subjects = () => {
  const [getMat, setgetMat] = useState([]);
  const [listMat, setListMat] = useState([]);
  const [user, setUser] = useState({});
  const [section, setSection] = useState(<DefaultSection />);
  const [mess, setMes] = useState();

  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };

  const compare = () => {
    for (let i = 0; i < getMat.length; i++) {
      for (let j = 0; j < user.mat_id.length; j++) {
        if (getMat[i]._id === user.mat_id[j]) {
          listMat.push(getMat[i]);
        }
      }
    }
  };

  const getAllMatiere = () => {
    axios.get(`/matiere/getAllMatiere`).then((res) => {
      setgetMat(res.data);
    });
  };

  useEffect(() => {
    isUser();
    getAllMatiere();
    compare();
  }, [user._id]);
  const handleSubmit = (id) => {
    setSection(<Section id={id} />);
    setMes(<Message id={id} />);
  };
  return (
    <div>
      <div>
        <Header />
      </div>

      <div>
        <div className="Tside">
          <ProSidebar>
            <SidebarContent>
              <Menu iconShape="square">
                {listMat.map((el) => (
                  <div>
                    <MenuItem icon={<FiBook />}>
                      <a className="items" onClick={() => handleSubmit(el._id)}>
                        <p> {el.name}</p>
                      </a>
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </div>

        <div>
          {section}
          {mess}
        </div>
      </div>
    </div>
  );
};

export default Subjects;

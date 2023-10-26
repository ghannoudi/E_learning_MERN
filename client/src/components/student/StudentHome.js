import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFile, FiHome } from "react-icons/fi";

import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { CurrentUser } from "../../api/UserApi";
import Header from "../home/Header";
import Message from "./Message";
import Profile from "./SProfile";
import Section from "./Section";
import "./style.css";

function StudentHome() {
  const [user, setUser] = useState({});
  const [mes, setMes] = useState([]);
  const [getMat, setgetMat] = useState([]);
  const [section, setSection] = useState(<Profile />);

  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };

  const getAllMatiere = async () => {
    await axios.get(`/matiere/getMatiere/${user.spec_id}`).then((res) => {
      setgetMat(res.data);
    });
  };

  const affiche = (id) => {
    setSection(<Section id={id} />);
    setMes(<Message id={id} />);
  };
  const getProfile = () => {
    setSection(<Profile />);
    setMes([]);
  };



  useEffect(() => {
    isUser();
    getAllMatiere();
  }, [user.spec_id]);

  return (
    <div>
      {/* Navbar */}
      <div>
        <Header />
      </div>

      <div className="side">
        <ProSidebar>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <a onClick={() => getProfile()}>Profile</a>
              </MenuItem>
              {getMat.map((el) => (
                <MenuItem icon={<FiFile />}>
                  <a onClick={() => affiche(el._id)}>{el.name}</a>
                </MenuItem>
              ))}
            </Menu>
          </SidebarContent>
          <SidebarFooter className="footer"></SidebarFooter>
        </ProSidebar>
      </div>
      <div>
        {section}
        {mes}
       
      </div>
    
   
    </div>
  );
}

export default StudentHome;

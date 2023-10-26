import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiCodesandbox,
  FiShoppingBag,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";

function SideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload();
  };
  return (
    <ProSidebar className="sideBar">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem active={true} icon={<FiHome />}>
            <a href="/admin">Home</a>
          </MenuItem>
          <hr></hr>
          <MenuItem>
            <h3>Users</h3>
            <hr></hr>
          </MenuItem>

          <MenuItem icon={<FiUsers />}>
            <a href="/admin/student">Students</a>
          </MenuItem>
          <MenuItem icon={<FiUsers />}>
            <a href="/admin/teacher">Teachers</a>
          </MenuItem>
          <hr></hr>
          <MenuItem>
            <h3>Sector</h3>
          </MenuItem>
          <MenuItem icon={<FiLayers />}>
            <a href="/admin/deppartement">Deppartements</a>
          </MenuItem>
          <MenuItem icon={<FiCodesandbox />}>
            <a href="/admin/specialite">Levels</a>
          </MenuItem>
          <MenuItem icon={<FiShoppingBag />}>
            <a href="/admin/matiere">Subjects</a>
          </MenuItem>

          <MenuItem>
            <hr></hr>
            <h3>Contact</h3>
          </MenuItem>
          <MenuItem icon={<FiMessageSquare />}>
            <a href="/admin/contact">ALL messages</a>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter className="footer">
        <Menu iconShape="square">
          <MenuItem onClick={handleLogout}>
            <FiLogOut style={{ marginRight: "10%" }} />
            Logout
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default SideBar;

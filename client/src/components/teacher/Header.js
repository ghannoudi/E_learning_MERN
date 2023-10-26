import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../api/UserApi";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isTeacher");
    navigate("/");
    window.location.reload();
  };
  const [user, setUser] = useState({});

  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };
  useEffect(() => {
    isUser();
  }, []);
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light Header">
        {/* Container wrapper */}
        <div className="container-fluid">
        <img
            src={user.photo || "/imgs/userLogo.png"}
            class="rounded-circle Tlogo"
            height="25"
            alt=""
            loading="lazy"
            
          />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 Navbar contentHeader">
              <li className="nav-item">
                <a className="nav-link" href="/teacher">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/teacher/profil">
                  Profil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/teacher/subjects">
                  Subjects
                </a>
              </li>
           
            </ul>
          </div>
        
          <div className="dropdown" style={{ marginRight: "3%" }}>
            <button className="btn btn-success" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

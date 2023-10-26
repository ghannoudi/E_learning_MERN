import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../api/UserApi";
import "./style.css"
const SHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isStudent");
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
         <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light SHeader">
        {/* Container wrapper */}
        <div className="container-fluid">
        {user.photo ? <img
            src={user.photo}
            class="rounded-circle Tlogo"
            height="25"
            alt=" "
            loading="lazy"
          />:""}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 Navbar contentHeader">
              <li className="nav-item">
                <a className="nav-link" href="/student">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/student/profil">
                  Profil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/student/subjects">
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
    </div>
  )
}

export default SHeader
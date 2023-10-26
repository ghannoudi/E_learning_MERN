import React from "react";
import { FiArchive } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Header() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light heder">
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Collapsible wrapper */}
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ paddingLeft: "3%" }}
          >
            <img className="logogereral" src="/imgs/Logo.jpg" alt="" />
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 Navbar">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/help">
                  Contact{" "}
                </a>
              </li>
            </ul>
            {/* Left links */}
          </div>
          {/* Collapsible wrapper */}
          {/* Right elements */}
          <div className="d-flex align-items-center">
            {/* Icon */}

            {/* Avatar */}
            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="./imgs/userLogo.png"
                  className="rounded-circle"
                  height={25}
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                {!token ? (
                  <>
                    <li>
                      <a className="dropdown-item" href="/login">
                        login
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/register">
                        register
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* Right elements */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </div>
  );
}

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
export default function Footer() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/register");
  };
  return (
    <div style={{ overflowX:"hidden" }}>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div>
        {/* Footer */}
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#3e4551" }}
        >
          {/* Grid container */}
          <div className="container p-4 pb-0">
            {/* Section: Links */}
            <section className>
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div
                  className="col-lg-9 col-md- mb-8 mb-md-0"
                  style={{ marginLeft: "450px" }}
                >
                  <h5>Start with performance, end with performance</h5>
                </div>
              </div>
              {/*Grid row*/}
            </section>
            {/* Section: Links */}
            <hr className="mb-4" />
            {/* Section: CTA */}
            {/* <section className>
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <button
                  type="button"
                  className="btn btn-outline-light btn-rounded"
                  onClick={handleLogin}
                >
                  Sign up!
                </button>
              </p>
            </section> */}
            {/* Section: CTA */}
            <hr className="mb-4" />
            {/* Section: Social media */}
            <section className="mb-4 text-center">
              {/* Facebook */}
              <a
                target="_blank"
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.facebook.com"
                role="button"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              {/* Twitter */}
              <a
                target="_blank"
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.twitter.com"
                role="button"
              >
                <i className="fab fa-twitter" />
              </a>
              {/* Google */}
              <a
                target="_blank"
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.google.com"
                role="button"
              >
                <i className="fab fa-google" />
              </a>
              {/* Instagram */}
              <a
                target="_blank"
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.instagram.com"
                role="button"
              >
                <i className="fab fa-instagram" />
              </a>
              {/* Linkedin */}
              <a
                target="_blank"
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.Linkedin.com"
                role="button"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </section>
            {/* Section: Social media */}
          </div>
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2022 Copyright
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
    </div>
  );
}

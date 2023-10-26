import { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { connect } from "../../api/UserApi";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    connect(user, navigate);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className={styles.input}
            />

            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
            <Link to="/forgetpassword">forget password ?</Link>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

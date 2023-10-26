import React, { useState } from "react";
import axios from "axios";
import styles from "../styles.module.css";
import Swal from "sweetalert2";
const Forget = () => {
  const [forget, setForget] = useState({ email: "" });
  const forgetpassword = async () => {
    try {
      const res = await axios.post(`/user/forgetpassword`, forget);
      alert(`${res.data.msg}`);
    } catch (error) {
      const { errors, msg } = error.response.data;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${msg}`,
      });
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <input
              placeholder="Email"
              className={styles.input}
              type="email"
              onChange={(e) => setForget({ ...forget, email: e.target.value })}
            />
            <button className={styles.green_btn} onClick={forgetpassword}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forget;

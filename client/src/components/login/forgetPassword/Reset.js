import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles.module.css";
import Swal from "sweetalert2";
const Reset = () => {
  const [pass, setPass] = useState({ password: "", confirmPassword: "" });
  const params = useParams();
  const reset = async () => {
    try {
      if (pass.password != pass.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "the two passwords are not the same!",
        });
      } else {
        const res = await axios.post(
          `/user/password/reset/${params.token}`,
          pass
        );
        console.log(res);
        alert(`${res.data.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <input
              placeholder="password"
              className={styles.input}
              type="password"
              onChange={(e) => {
                setPass({ ...pass, password: e.target.value });
              }}
            />
            <input
              placeholder=" write your password again"
              className={styles.input}
              type="password"
              onChange={(e) => {
                setPass({ ...pass, confirmPassword: e.target.value });
              }}
            />
            <button className={styles.green_btn} onClick={reset}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;

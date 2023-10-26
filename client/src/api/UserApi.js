
import axios from "axios";

export const connect = async (user, navigate) => {

    const config = { headers: { "Content-Type": "application/json" } };
    try {

        const res = await axios.post("/user/login", user, config);
        localStorage.setItem("token", res.data.token);
            if (res.data.user.isAdmin === true) {
                localStorage.setItem("isAdmin", res.data.user.isAdmin);
            }


            if (res.data.user.isAdmin) {
                navigate("/admin");
                window.location.reload();
            }

        if (res.data.user.isStudent === true) {
            localStorage.setItem("isStudent", res.data.user.isStudent);
        }


        if (res.data.user.isStudent) {
            navigate("/student");
            window.location.reload();
        }

        if (res.data.user.isTeacher === true) {
            localStorage.setItem("isTeacher", res.data.user.isTeacher);
        }


        if (res.data.user.isTeacher) {
            navigate("/teacher");
            window.location.reload();
        }

    } catch (error) {
        const { errors, msg } = error.response.data;
        if (Array.isArray(errors)) {
            errors.map((el) => alert(el.msg));
        }
        if (msg) {
            alert(msg);
        }

        console.log(error);
    }
};

export const CurrentUser = async () => {
    let opts = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get("/user/curentUser", opts);
      console.log(res.data.user)
       
      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  };
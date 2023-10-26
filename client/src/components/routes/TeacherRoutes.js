import { Outlet, Navigate } from "react-router-dom";
const TeacherRoute = () => {
    const isTeacher = localStorage.getItem("isTeacher");
   
   
        return isTeacher ? <Outlet /> : <Navigate to="/" />
};
export default TeacherRoute;
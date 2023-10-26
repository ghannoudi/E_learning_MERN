import { Outlet, Navigate } from "react-router-dom";
const StudentRoute = () => {
    const isStudent = localStorage.getItem("isStudent");
   
        return isStudent ? <Outlet /> : <Navigate to="/" />
};
export default StudentRoute;
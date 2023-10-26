import { Outlet, Navigate } from "react-router-dom";
const AdminRoute = () => {
    const isAdmin = localStorage.getItem("isAdmin");
  return isAdmin ? <Outlet /> : <Navigate to="/" />

    
};
export default AdminRoute;
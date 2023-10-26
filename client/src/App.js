import React from "react";
import { Route, Routes } from "react-router-dom";
import Deppartement from "./components/admin/deppartement/Deppartement";
import Matiere from "./components/admin/matiere/Matiere";
import Specialite from "./components/admin/specialite/Specialite";
import Char1 from "./components/admin/dachboard/Char1";
import Student from "./components/admin/student/Students";
import AdminHome from "./components/admin/AdminHome/Home";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import StudentHome from "./components/student/StudentHome";
import Header from "./components/home/Header";
import AdminRoute from "./components/routes/AdminRoutes";
import Help from "./components/help/Help";
import Footer from "./components/footer/Footer";
import Teacher from "./components/admin/teacher/Teacher";
import Contact from "./components/admin/Contact";
import THome from "./components/teacher/THome";
import Subjects from "./components/teacher/Subjects";
import TProfil from "./components/teacher/TProfil";
import SHome from "./components/student/SHome";
import SProfil from "./components/student/SProfile";
import ErrorPage from "./components/error/ErrorPage";
import SSubjects from "./components/student/SSubjects";
import Forget from "./components/login/forgetPassword/Forget";
import Reset from "./components/login/forgetPassword/Reset";
function App() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <div>
      {!token ? <Header /> : ""}
      {isAdmin ? <AdminHome /> : <></>}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<ErrorPage />} />
{!token ? <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/help" element={<Help />} />
        </>
      :""
      }

        <Route path="/password/reset/:token" element={<Reset />} />

        <Route path="/student" element={<SHome />} />
        <Route path="/student/profil" element={<SProfil />} />
        <Route path="/student/subjects" element={<SSubjects />} />

        <Route path="/teacher" element={<THome />} />
        <Route path="/teacher/subjects" element={<Subjects />} />
        <Route path="/teacher/profil" element={<TProfil />} />

       

   

        <Route element={<AdminRoute />}>
        
          <Route path="/admin/deppartement" element={<Deppartement />} />
          <Route path="/admin/matiere" element={<Matiere />} />
          <Route path="/admin/specialite" element={<Specialite />} />
          <Route path="/admin/student" element={<Student />} />
          <Route path="/admin/teacher" element={<Teacher />} />
          <Route path="/admin/contact" element={<Contact />} />
          <Route path="/admin" element={<Char1 />} />
        </Route>
      </Routes>
      {!token && <Footer />}
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import "./Dashboard.css";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="app-navbar">
      <div className="container-fluid">
        <div className="navbar-brand name">
          TimeAttendance
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student">
                นักเรียน
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teacher">
                คุณครู
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                ชั้นปี
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                ตารางเรียน
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                วิชาเรียน
              </Link>
            </li>
          </ul>
          <Link className="nav-link " to="/">
            <span onClick={() => firebaseConfig.auth().signOut()}>ออกจากระบบ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashBoard;
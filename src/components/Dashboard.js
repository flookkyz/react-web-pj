import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
// import firebase from "../config";
import "./Dashboard.css";
// import Swal from "sweetalert2";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/" />;
  }


  // function updateclass() {
  //   Swal.fire({
  //     title: "คุณแน่ใจแล้วที่จะอัปเดทชั้นปี ?",
  //     text: "การอัปเดทชั้นปีมีผลทำให้ชั้นปีนักเรียนทุกคนเปลี่ยนแปลง",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     cancelButtonText: "ไม่ใช่",
  //     confirmButtonText: "ใช่",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("สำเร็จ!", "คุณได้ทำการอัปเดทชั้นปีเรียบร้อยแล้ว", "success");
  //       firebase
  //         .firestore()
  //         .collection("students")
  //         .get()
  //         .then((querySnapshot) => {
  //           querySnapshot.docs.forEach((doc) => {
  //             firebase
  //               .firestore()
  //               .collection("students")
  //               .doc(doc.data().uid)
  //               .update({
  //                 cid: (parseInt(doc.data().cid) + 10).toString(),
  //                 croom: (parseInt(doc.data().croom) + 1).toString(),
  //               });
  //             if (doc.data().croom === 7) {
  //               firebase
  //                 .firestore()
  //                 .collection("students")
  //                 .doc(doc.data().uid)
  //                 .delete();
  //             }
  //           });
  //         });
  //     }
  //   });
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="app-navbar">
      <div className="container-fluid">
        <div className="navbar-brand name">TimeAttendance</div>
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
            {/* <li className="nav-item">
              <Link className="nav-link" to="/home">
                ชั้นปี
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/table">
                ตารางเรียน
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/score">
                วิชาเรียน
              </Link>
            </li>
            <li  className="nav-item">
              <Link className="nav-link" to="/homeadmin">
                ADMIN
              </Link>
            </li>
            <li>

            </li>
          </ul>
          <Link className="nav-link " to="/">
            <span onClick={() => firebaseConfig.auth().signOut()}>
              ออกจากระบบ
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashBoard;

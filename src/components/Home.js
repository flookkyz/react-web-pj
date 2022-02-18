import React from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "./Auth";
// import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { BsFillBookFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

const Home = () => {
  // const { currentUser } = useContext(AuthContext);
  // firebase.auth().onAuthStateChanged((user) => {
  //   const uid = user.uid;
  //   firebase
  //     .firestore()
  //     .collection("students")
  //     .doc(uid)
  //     .get()
  //     .then((documentSnapshot) => {
  //       console.log("cid =", documentSnapshot.data().cid);
  //       console.log("uid =", uid); });
  //     });

  return (
    <>
      <header>
        <DashBoard />
      </header>
      <br />
      <br />
      <div className="container">
        <div className="d-flex justify-content-center mt-3">
          <span className="text text-center">Wathongpathummawat School</span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="grid">
        <div className="item">
          <div className="content">
            <br />
            <br />
            <BsFillPersonFill className="ic text-center" />
            <br />
            <br />
            <p>นักเรียน</p>
            <Link to="createstu">
              <button className="btn btn-primary me-md-2 add" type="button">
                เพิ่ม
              </button>
            </Link>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <br />
            <br />
            <FaChalkboardTeacher className="ic text-center" />
            <br />
            <br />
            <p>คุณครู</p>
            <Link to="createtea">
              <button className="btn btn-primary me-md-2 add" type="button">
                เพิ่ม
              </button>
            </Link>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <br />
            <br />
            <BsFillImageFill className="ic text-center" />
            <br />
            <br />
            <p>ตารางเรียน</p>
            <Link to="table">
              <button className="btn btn-primary me-md-2 add" type="button">
              แก้ไข
              </button>
            </Link>
          </div>
        </div>
        <div className="item">
          <div className="content">
            <br />
            <br />
            <BsFillBookFill className="ic text-center" />
            <br />
            <br />
            <p>วิชา</p>
            <Link to="score">
              <button className="btn btn-primary me-md-2 add" type="button">
                แก้ไข
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

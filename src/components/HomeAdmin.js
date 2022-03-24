import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "./Auth";
// import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

class HomeAdmin extends Component {
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

  state = {
    disabled: true,
  };

  showbuttonadmin = (e) => {
    if (e.target.value === "admin") {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <br />
        <br />
        <div className="container">
          <div className="d-flex justify-content-center mt-3">
            <span className="text text-center">ADMIN PAGE</span>
            
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="grid2">
          <div className="item">
            <div className="content">
              <br />
              <br />
              <BsFillPersonFill className="ic text-center" />
              <br />
              <br />
              <p>นักเรียน</p>
              <Link to="/createstu">
                <button
                  className="btn btn-primary  add text-center"
                  type="button"
                >
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

              <Link to="/createtea">
                <button className="btn btn-primary  add" type="button">
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
              <p>อัปเดทชั้นปี</p>
              <Link to="/updateclass">
                <button className="btn btn-primary  add" type="button">
                  อัปเดท
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomeAdmin;

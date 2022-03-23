import React, { Component } from "react";
// import { Link } from "react-router-dom";
import firebase from "../config";
// import { AuthContext } from "./Auth";
// import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: "",
      teachers: "",
      key: "",
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((doc) => {
        this.setState({
          students: doc.size,
        });
      });
    firebase
      .firestore()
      .collection("teachers")
      .get()
      .then((doc) => {
        this.setState({
          teachers: doc.size,
        });
      });
  }
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
              <p>จำนวนนักเรียนทั้งหมด</p>
              <p>{this.state.students}</p>
              <p>คน</p>
            </div>
          </div>
          <div className="item">
            <div className="content">
              <br />
              <br />
              <FaChalkboardTeacher className="ic text-center" />
              <br />
              <br />
              <p>จำนวนคุณครูทั้งหมด</p>
              <p>{this.state.teachers}</p>
              <p>คน</p>
            </div>
          </div>
          
        </div>
      </>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";

class Student extends Component {
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      firebase
        .firestore()
        .collection("teachers")
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          console.log("cid =", documentSnapshot.data().cid);
          console.log("uid =", uid);
          if (documentSnapshot.data().cid !== "admin") {
            this.ref = firebase
              .firestore()
              .collection("students")
              .where("cid", "==", documentSnapshot.data().cid)
              .orderBy("stunum", "asc");
          } else {
            this.ref = firebase
              .firestore()
              .collection("students")
              .orderBy("stunum", "asc");
          }
          this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        });
    });

    this.state = {
      user: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      const { stunum, stuname, croom, nroom } = doc.data();
      user.push({
        key: doc.id,
        doc, // DocumentSnapshot
        stunum,
        stuname,
        croom,
        nroom,
      });
    });
    this.setState({
      user,
    });
  };

  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <br />
        <div className="container text-center">
          <div className="d-flex justify-content-center mt-3">
            <span className="text text-center">ข้อมูลนักเรียน</span>
          </div>
          <br />
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover border-gray-300 tb">
                <thead>
                  <tr>
                    <th>รหัสนักเรียน</th>
                    <th>ชื่อ - นามสกุล</th>
                    <th>ชั้นปี</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.map((user) => (
                    <tr>
                      <td>{user.stunum}</td>
                      <td>{user.stuname}</td>
                      <td>
                        {user.croom}/{user.nroom}
                      </td>
                      <td>
                        <Link to={`/showstu/${user.key}`}>
                          <button
                            type="button"
                            className="btn btn-outline-warning bt"
                          >
                            แก้ไข
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Student;

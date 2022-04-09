import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

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
          // console.log("cid =", documentSnapshot.data().cid);
          // console.log("uid =", uid);
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
      this.ref = firebase
        .firestore()
        .collection("students")
        .orderBy("stunum", "asc");
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    });

    this.state = {
      user: [],
      filterUser: [],
      page: 1,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const user = [];

    querySnapshot.forEach((doc) => {
      const { stunum, stuname, stulastname, croom, nroom } = doc.data();
      user.push({
        key: doc.id,
        doc, // DocumentSnapshot
        stunum,
        stuname,
        stulastname,
        croom,
        nroom,
      });
    });

    this.setState({
      user,
    });
    this.onUpdate();
  };

  onUpdate = () => {
    let start = (this.state.page - 1) * 10;
    console.log("start Page => ", start);
    this.setState({
      filterUser: this.state.user.slice(start, Number(start) + Number(10)),
    });
    console.log("filter => ", this.state.filterUser);
  };

  onNextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });

    if (this.state.page >= Math.ceil(this.state.user.length / 10)) {
      this.setState({
        page: Math.ceil(this.state.user.length / 10),
      });
    }
    this.onUpdate();
  };

  onPrevPage = () => {
    this.setState({
      page: this.state.page - 1,
    });

    if (this.state.page <= 1) {
      this.setState({
        page: 1,
      });
    }
    this.onUpdate();
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
              <table
                className="table table-hover border-gray-300 tb"
                id="table"
                data-toggle="table"
                data-height="460"
                data-pagination="true"
                data-page-size="25"
              >
                <thead>
                  <tr>
                    <th>รหัสนักเรียน</th>
                    <th>ชื่อ - นามสกุล</th>
                    <th>ชั้นปี</th>

                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filterUser.map((user) => (
                    <tr>
                      <td>{user.stunum}</td>
                      <td>
                        {user.stuname} {user.stulastname}
                      </td>
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
          <div className="float-end">
            <IoIosArrowDropleftCircle
              className="tabtn mx-2"
              onClick={this.onPrevPage}
            >
              PrevPage
            </IoIosArrowDropleftCircle>
            {this.state.page}
            <IoIosArrowDroprightCircle
              className="tabtn mx-2"
              onClick={this.onNextPage}
            >
              nextPage
            </IoIosArrowDroprightCircle>
          </div>
        </div>
      </>
    );
  }
}

export default Student;

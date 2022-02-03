import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("teachers")
      .where("teanum", "!=", "a")
      .orderBy("teanum", "asc");
    this.unsubscribe = null;
    this.state = {
      user: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      const { teanum, teaname, croom, nroom } = doc.data();
      user.push({
        key: doc.id,
        doc, // DocumentSnapshot
        teanum,
        teaname,
        croom,
        nroom,
      });
    });
    this.setState({
      user,
    });
  };
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <br />
        <div className="container text-center">
          <div className="d-flex justify-content-center mt-3">
            <span className="text text-center">ข้อมูลคุณครู</span>
          </div>
          <br />
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover border-gray-300 tb">
                <thead>
                  <tr>
                    <th>รหัสคุณครู</th>
                    <th>ชื่อ - นามสกุล</th>
                    <th>ห้องประจำชั้น</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.map((user) => (
                    <tr>
                      <td>{user.teanum}</td>
                      <td>{user.teaname}</td>
                      <td>
                        {user.croom}/{user.nroom}
                      </td>
                      <td>
                        <Link to={`/showtea/${user.key}`}>
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

export default Teacher;

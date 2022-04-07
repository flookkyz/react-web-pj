import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";

class ShowScore extends Component {
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
          this.ref = firebase
            .firestore()
            .collection("students")
            // .where("sid", "array-contains", documentSnapshot.data().sid)
            .doc(this.props.match.params.id)
            .collection(documentSnapshot.data().sj);
          //   .orderBy("doc", "asc")
          this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        });
    });

    this.state = {
      user: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const user = [];
    const nb = 1;
    querySnapshot.forEach((doc) => {
      const { score, note } = doc.data();
      user.push({
        key: doc.id,
        rekey: this.props.match.params.id,
        nb,
        doc, // DocumentSnapshot
        score,
        note,
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
            <span className="text text-center">
              คะแนนนักเรียนในรายวิชาที่สอน
            </span>
          </div>
          <br />
          <div className="float-end">
            <button type="button" className="btn btn-outline-warning bt">
              ดาวน์โหลดคะแนน
            </button>

            <br />
            <br />
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover border-gray-300 tb">
                <thead>
                  <tr>
                    <th>ครั้งที่</th>
                    <th>รายละเอียดงาน</th>
                    <th>คะแนน</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.map((user) => (
                    <tr>
                      <td>{user.key}</td>
                      <td>{user.note}</td>
                      <td>{user.score}</td>
                      <td>
                        <Link to={`/rescore/${user.rekey}/${user.key}`}>
                          <button
                            type="button"
                            className="btn btn-outline-warning bt"
                          >
                            แก้ไข
                          </button>
                        </Link>
                        {/* <Link to={`/reportscore/${user.key}`}>
                          <button
                            type="button"
                            className="mx-2 btn btn-outline-warning bt"
                          >
                            ดาวน์โหลดคะแนน
                          </button>
                        </Link> */}
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

export default ShowScore;

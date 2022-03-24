import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("tables")
    //   .where("teanum", "!=", "a")
      .orderBy("cid", "asc");
    this.unsubscribe = null;
    this.state = {
      user: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const user = [];
    querySnapshot.forEach((doc) => {
      const { croom } = doc.data();
      user.push({
        key: doc.id,
        doc, // DocumentSnapshot
        croom,
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
            <span className="text text-center">ข้อมูลตารางเรียน</span>
          </div>
          <br />
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover border-gray-300 tb">
                <thead>
                  <tr>
                    <th>ชั้นปี</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.map((user) => (
                    <tr>
                      <td>
                        {user.croom}
                      </td>
                      <td>
                        <Link to={`/showtable/${user.key}`}>
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

export default Table;

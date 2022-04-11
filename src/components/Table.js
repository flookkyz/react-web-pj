import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./Allpage.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

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
      filterUser: [],
      
    };
    this.Page = 1;
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
    this.onUpdate();
  };
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onUpdate = () => {
    let start = (this.Page - 1) * 4;
    console.log("start Page => ", start);
    this.setState({
      filterUser: this.state.user.slice(start, Number(start) + Number(4)),
    });
    console.log("filter => ", this.state.filterUser);
  };

  onNextPage = () => {
    this.Page = this.Page + 1;
   
    console.log("onNextPage Page : ",this.Page)
  
    if (this.Page >= Math.ceil(this.state.user.length / 4)) {
      this.Page = Math.ceil(this.state.user.length / 4)
    }
    this.onUpdate();
  };

  onPrevPage = () => {
    this.Page = this.Page - 1;
    if (this.Page <= 1) {
      this.Page = 1;
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
                  {this.state.filterUser.map((user) => (
                    <tr>
                      <td>{user.croom}</td>
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
          <div className="float-end">
            <IoIosArrowDropleftCircle
              className="tabtn mx-2"
              onClick={this.onPrevPage}
            >
              PrevPage
            </IoIosArrowDropleftCircle>
            {this.Page}
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

export default Table;

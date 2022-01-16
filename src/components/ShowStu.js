import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import DashBoard from "./Dashboard";


class ShowStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: {},
      key: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("students")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          students: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("students")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/student");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  


  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <div class="container text-center">
          <div class="panel panel-default">
            <div class="panel-body">
              <br /><br />
              <dl>
                <dt>รหัสนักเรียน :</dt>
                <dd>{this.state.students.stunum}</dd>
                <dt>ชื่อ - นามสกุล :</dt>
                <dd>{this.state.students.stuname}</dd>
                <dt>ชั้นปี :</dt>
                <dd>{this.state.students.croom}</dd>
                <dt>ห้อง :</dt>
                <dd>{this.state.students.nroom}</dd>
              </dl>
              <Link to={`/editstu/${this.state.key}`} class="btn btn-success bt">
              แก้ไข
              </Link>
              &nbsp;
              <button
                onClick={this.delete.bind(this, this.state.key)}
                class="btn btn-danger btr"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShowStu;

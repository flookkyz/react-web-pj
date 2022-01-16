import React, { Component } from "react";
import firebase from "../config";
// import { Link } from "react-router-dom";
import "./Create.css";

class EditStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      stunum: "",
      stuname: "",
      croom: "",
      nroom: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("students")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const students = doc.data();
        this.setState({
          key: doc.id,
          stunum: students.stunum,
          stuname: students.stuname,
          croom: students.croom,
          nroom: students.nroom,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ students: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { stunum, stuname, croom, nroom,} = this.state;

    const updateRef = firebase
      .firestore()
      .collection("students")
      .doc(this.state.key);
    updateRef
      .update({
        stunum,
        stuname,
        croom,
        nroom,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          stunum: "",
          stuname: "",
          croom: "",
          nroom: "",
        });
        this.props.history.push("/student");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <br />
            <br />
            
          </div>
          <form className="signup-login" onSubmit={this.onSubmit}>
          <h3 class="panel-title text-center">แก้ไขข้อมูลนักเรียน</h3>
            <div class="form-group ">
              <label for="title">รหัสนักเรียน:</label>
              <input
                type="text"
                class="form-control in"
                name="stunum"
                value={this.state.stunum}
                onChange={this.onChange}
                placeholder="ID"
              />
            </div>
            <div class="form-group">
              <label for="description">ชื่อ - นามสกุล :</label>
              <input
                type="text"
                class="form-control in"
                name="stuname"
                value={this.state.stuname}
                onChange={this.onChange}
                placeholder="Name"
              />
            </div>
            <div class="form-group">
              <label for="author">ชั้นปี :</label>
              <input
                type="text"
                class="form-control in"
                name="croom"
                value={this.state.croom}
                onChange={this.onChange}
                placeholder="Class"
              />
            </div>
            <div class="form-group">
              <label for="author">ห้อง :</label>
              <input
                type="text"
                class="form-control in"
                name="nroom"
                value={this.state.nroom}
                onChange={this.onChange}
                placeholder="Room"
              />
            </div>
            <br />
            <button type="submit">
              แก้ไข
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditStu;

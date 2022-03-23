import React, { Component } from "react";
import firebase from "../config";
// import { Link } from "react-router-dom";
import "./Create.css";
import Swal from "sweetalert2";

class EditStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      stunum: "",
      stuname: "",
      croom: "",
      nroom: "",
      cid: "",
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
          cid: students.cid,
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

    const { stunum, stuname, croom, nroom, cid } = this.state;

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
        cid,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          stunum: "",
          stuname: "",
          croom: "",
          nroom: "",
          cid: "",
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'แก้ไขข้อมูลนักเรียนสำเร็จ',
          timer: 1500,
          showConfirmButton: false
        })
        this.props.history.push("/student");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <form className="signup-login" onSubmit={this.onSubmit}>
        <h2 className="text-center">แก้ไขนักเรียน</h2>
        <div className="form-group ">
          <label htmlFor="title">รหัสนักเรียน :</label>
          <input
            type="text"
            className="form-control in"
            name="stunum"
            value={this.state.stunum}
            onChange={this.onChange}
            placeholder="ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">ชื่อ - นามสกุล :</label>
          <input
            type="text"
            className="form-control in"
            name="stuname"
            value={this.state.stuname}
            onChange={this.onChange}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">รหัสชั้นเรียน :</label>
          <input
            type="text"
            className="form-control in"
            name="cid"
            value={this.state.cid}
            onChange={this.onChange}
            placeholder="className ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">ชั้นปี :</label>
          <input
            type="text"
            className="form-control in"
            name="croom"
            value={this.state.croom}
            onChange={this.onChange}
            placeholder="className"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">ห้อง :</label>
          <input
            type="text"
            className="form-control in"
            name="nroom"
            value={this.state.nroom}
            onChange={this.onChange}
            placeholder="Room"
          />
        </div>
        <br />
        <div className="text-center">
          <button type="submit" className="btn btn-success bt ">
            แก้ไข
          </button>
        </div>
      </form>
    );
  }
}

export default EditStu;

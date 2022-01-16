import React, { Component } from "react";
import firebase from "../config";
import DashBoard from "./Dashboard";
import ImageUpload from "./ImageUpload";
import "./Create.css";

class CreateTable extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("tebles");
    this.state = {
      croom: "",
      nroom: "",
      cid: "",
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {croom, nroom, cid } = this.state;

    this.ref
      .add({
        croom,
        nroom,
        cid,
      })
      .then((docRef) => {
        this.setState({
          croom: "",
          nroom: "",
          cid: "",
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const {croom, nroom, cid } = this.state;
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body ">
              <br />
              <br />
              <h4 className="text-center">เพิ่มตารางเรียน</h4>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="author">รหัสชั้นเรียน :</label>
                  <input
                    type="text"
                    className="form-control in"
                    name="cid"
                    value={cid}
                    onChange={this.onChange}
                    placeholder="รหัสรหัสชั้นเรียน (ตัวอย่าง 11)"
                  />
                </div>
                <div className="form-group">
                  <label for="author">ชั้นปี :</label>
                  <input
                    type="text"
                    className="form-control in"
                    name="croom"
                    value={croom}
                    onChange={this.onChange}
                    placeholder="กรอกเลขชั้นปี"
                  />
                </div>
                <div className="form-group">
                  <label for="title">ห้อง :</label>
                  <input
                    type="text"
                    className="form-control in"
                    name="nroom"
                    value={nroom}
                    onChange={this.onChange}
                    placeholder="กรอกเลขห้อง"
                  />
                </div>
                <div className="text-center">
                  <br />
                  <button
                    type="submit"
                    className="btn btn-success text-center bt"
                  >
                    เพิ่ม
                  </button>
                </div>
                <ImageUpload />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateTable;

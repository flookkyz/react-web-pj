import React, { Component } from "react";
import firebase from "../config";
// import { Link } from "react-router-dom";
import "./Create.css";

class EditTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      teanum: "",
      teaname: "",
      croom: "",
      nroom: "",
      cid: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("teachers")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const teachers = doc.data();
        this.setState({
          key: doc.id,
          teanum: teachers.teanum,
          teaname: teachers.teaname,
          croom: teachers.croom,
          nroom: teachers.nroom,
          cid: teachers.cid,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ teachers: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { teanum, teaname, croom, nroom, cid } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("teachers")
      .doc(this.state.key);
    updateRef
      .set({
        teanum,
        teaname,
        croom,
        nroom,
        cid,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          teanum: "",
          teaname: "",
          croom: "",
          nroom: "",
          cid: "",
        });
        this.props.history.push("/teacher");
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
              <br /><br />
            <h3 class="panel-title">แก้ไขข้อมูลคุณครู</h3>
          </div>
            <form onSubmit={this.onSubmit}>
              <div class="form-group ">
                <label for="title">รหัสคุณครู :</label>
                <input
                  type="text"
                  class="form-control in"
                  name="stunum"
                  value={this.state.teanum}
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
                  value={this.state.teaname}
                  onChange={this.onChange}
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="author">รหัสชั้นเรียน :</label>
                <input
                  type="text"
                  class="form-control in"
                  name="cid"
                  value={this.state.cid}
                  onChange={this.onChange}
                  placeholder="Class ID"
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
              <button type="submit" class="btn btn-success bt">
                Submit
              </button>
            </form>
          </div>
        </div>
    );
  }
}

export default EditTea;

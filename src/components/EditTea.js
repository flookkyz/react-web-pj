import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import "./Create.css";
import Swal from "sweetalert2";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

class EditTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      teanum: "",
      teaname: "",
      tealastname: "",
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
          tealastname: teachers.tealastname,
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

    const { teanum, teaname, tealastname, croom, nroom, cid } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("teachers")
      .doc(this.state.key);
    updateRef
      .set({
        teanum,
        teaname,
        tealastname,
        croom,
        nroom,
        cid,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          teanum: "",
          teaname: "",
          tealastname: "",
          croom: "",
          nroom: "",
          cid: "",
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'แก้ไขข้อมูลคุณครูสำเร็จ',
          timer: 1500,
          showConfirmButton: false
        })
        this.props.history.push("/teacher");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <>
      <div class="position-absolute top-10 start-0">
          &nbsp;&nbsp;&nbsp;
          <Link to={`/showtea/${this.props.match.params.id}`}>
            <BsFillArrowLeftCircleFill className="iconbacktop" />
          </Link>
        </div>
      <form className="signup-login" onSubmit={this.onSubmit}>
        <h2 className="text-center">แก้ไขคุณครู</h2>
        <div class="form-group ">
          <label htmlFor="author">รหัสคุณครู :</label>
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
          <label htmlFor="author">ชื่อ :</label>
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
          <label htmlFor="description">นามสกุล :</label>
          <input
            type="text"
            class="form-control in"
            name="tealastname"
            value={this.state.tealastname}
            onChange={this.onChange}
            placeholder="Lastname"
          />
        </div>
        <div class="form-group">
          <label htmlFor="author">รหัสชั้นเรียน :</label>
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
          <label htmlFor="author">ชั้นปี :</label>
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
          <label htmlFor="author">ห้อง :</label>
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
        <div className="text-center">
          <button type="submit" className="btn btn-success bt ">
            แก้ไข
          </button>
        </div>
      </form>
      </>
    );
  }
}

export default EditTea;

import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import "./Create.css";
import Swal from "sweetalert2";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

class ReScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      note: "",
      score: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      firebase
        .firestore()
        .collection("teachers")
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          const ref = (this.ref = firebase
            .firestore()
            .collection("students")
            .doc(this.props.match.params.uid)
            .collection(documentSnapshot.data().sj)
            .doc(this.props.match.params.id));
          console.log("###", this.props);
          ref.get().then((doc) => {
            if (doc.exists) {
              const students = doc.data();
              this.setState({
                key: doc.id,
                note: students.note,
                score: students.score,
              });
            } else {
              console.log("No such document!");
            }
          });
        });
    });

    // const ref = firebase
    //   .firestore()
    //   .collection("students")
    //   .doc(this.props.match.params.uid)
    //   ;
    //   console.log("###",this.props)
    // ref.get().then((doc) => {
    //   if (doc.exists) {
    //     const students = doc.data();
    //     this.setState({
    //       key: doc.id,
    //       note: students.note,
    //       score: students.score,
    //     });
    //   } else {
    //     console.log("No such document!");
    //   }
    // });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ students: state });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { note, score } = this.state;

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      firebase
        .firestore()
        .collection("teachers")
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          const updateRef = firebase
            .firestore()
            .collection("students")
            .doc(this.props.match.params.uid)
            .collection(documentSnapshot.data().sj)
            .doc(this.props.match.params.id);
          updateRef
            .update({
              note,
              score,
            })
            .then((docRef) => {
              this.setState({
                key: "",
                note: "",
                score: "",
              });
              Swal.fire({
                position: "center",
                icon: "success",
                title: "แก้ไขคะแนนนักเรียนสำเร็จ",
                timer: 1500,
                showConfirmButton: false,
              });
              this.props.history.push(`/showscore/${this.props.match.params.uid}`);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
    });
  };

  render() {
    return (
      <>
      <div class="position-absolute top-10 start-0">
          &nbsp;&nbsp;&nbsp;
          <Link to={`/showscore/${this.props.match.params.uid}/${this.props.match.params.name}`}>
            <BsFillArrowLeftCircleFill className="iconbacktop" />
          </Link>
        </div>
      <form className="signup-login" onSubmit={this.onSubmit}>
        <div className="container text-center">
          <div className="panel panel-default">
            <div className="panel-body">
              <br />
              <br />
              <label className="mx-4" htmlFor="">
                กรอกคะแนน :
              </label>
              <input
                type="text"
                name="score"
                value={this.state.score}
                onChange={this.onChange}
                placeholder="กรอกคะแนนนักเรียน"
                required
              />
              <br />
              <label className="mx-2" htmlFor="">
                กรอกรายละเอียด :
              </label>
              <input
                type="text"
                name="note"
                value={this.state.note}
                onChange={this.onChange}
                placeholder="กรอกรายละเอียดของงาน"
                required
              />
              <br />
              <br />
              <button className="btn btn-success bt ">เพิ่มคะแนน</button>
            </div>
          </div>
        </div>
      </form>
      </>
    );
  }
}

export default ReScore;

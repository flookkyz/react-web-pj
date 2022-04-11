import React, { Component } from "react";
// import { Link } from "react-router-dom";
import firebase from "../config";
import DashBoard from "./Dashboard";
import "./LogIn.css";
import Swal from "sweetalert2";

class Student extends Component {
  test() {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          firebase
            .firestore()
            .collection("students")
            .doc(doc.data().uid)
            .collection("test")
            .get()
            .toPromise()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.delete();
              });
            });
        });
      });
  }
  updateclass() {
    Swal.fire({
      title: "คุณแน่ใจแล้วที่จะอัปเดทชั้นปี ?",
      text: "การอัปเดทชั้นปีมีผลทำให้ชั้นปีนักเรียนทุกคนเปลี่ยนแปลง",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ไม่ใช่",
      confirmButtonText: "ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("สำเร็จ!", "คุณได้ทำการอัปเดทชั้นปีเรียบร้อยแล้ว", "success");
        firebase
          .firestore()
          .collection("students")
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              firebase
                .firestore()
                .collection("students")
                .doc(doc.data().uid)
                .update({
                  cid: (parseInt(doc.data().cid) + 10).toString(),
                  croom: (parseInt(doc.data().croom) + 1).toString(),
                  sid: [
                    `thai${parseInt(doc.data().croom) + 1}`,
                    `english${parseInt(doc.data().croom) + 1}`,
                    `math${parseInt(doc.data().croom) + 1}`,
                    `science${parseInt(doc.data().croom) + 1}`,
                    `computer${parseInt(doc.data().croom) + 1}`,
                    `social${parseInt(doc.data().croom) + 1}`,
                    `pe${parseInt(doc.data().croom) + 1}`,
                    `art${parseInt(doc.data().croom) + 1}`,
                    `career${parseInt(doc.data().croom) + 1}`,
                    `guidance${parseInt(doc.data().croom) + 1}`,
                  ],
                });
              if (doc.data().croom === 7) {
                firebase
                  .firestore()
                  .collection("students")
                  .doc(doc.data().uid)
                  .delete();
              }
            });
          });
      }
    });
  }

  state = {
    disabled: true,
  };

  showbuttonadmin = (e) => {
    if (e.target.value === "admin") {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <br />
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="card box1 shadowbox">
            <div className="position-absolute top-0 start-50 translate-middle-x">
              <br />
              <h3>เลื่อนระดับชั้นปี</h3>
            </div>
            <br />
            <br />
            <input
              className="text-center inputtext rounded-pill"
              type="password"
              placeholder="รหัสยืนยัน"
              onChange={this.showbuttonadmin}
            />
            <br />

            <button
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="กรุณากรอกรหัสยืนยัน"
              disabled={this.state.disabled}
              onClick={this.updateclass}
              className="buttonp1 text-white rounded-pill"
            >
              &nbsp;&nbsp;อัปเดทชั้นปี&nbsp;&nbsp;
            </button>
            <br />
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
              <h6 className="text-danger">*กรอกรหัสยืนยันก่อนถึงจะกดปุ่มได้</h6>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Student;

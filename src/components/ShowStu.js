import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import DashBoard from "./Dashboard";
import Swal from "sweetalert2";
import  QRCode  from "qrcode.react";

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
    }).then((value) =>{
      ref.collection("timeattendance").get().then((doc) => {
        this.setState({
          time: doc.size
        });
      })
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
        Swal.fire({
          position: "top",
          icon: "success",
          title: "ลบบัญชีสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.history.push("/student");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

     downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `${this.state.students.stunum}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
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
              <br />
              <br />
              <dl>
                <dt>รหัสนักเรียน :</dt>
                <dd>{this.state.students.stunum}</dd>
                <dt>ชื่อ - นามสกุล :</dt>
                <dd>{this.state.students.stuname} {this.state.students.stulastname}</dd>
                <dt>ชั้นปี :</dt>
                <dd>{this.state.students.croom} / {this.state.students.nroom}</dd>
                <dt>จำนวนวันที่มาเรียน :</dt>
                <dd>{this.state.time}</dd>
                <dt>QR Code</dt>
                <br />
                <dd><QRCode onClick={this.downloadQRCode} id="qrCodeEl" value={`${this.state.students.uid}`} /></dd>
              </dl>
              <br />
              <Link
                to={`/reporttime/${this.state.key}`}
                class="btn btn-success bt"
              >
                การเช็คชื่อ
              </Link>
              &nbsp;
              <Link
                to={`/editstu/${this.state.key}`}
                class="btn btn-success bt"
              >
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

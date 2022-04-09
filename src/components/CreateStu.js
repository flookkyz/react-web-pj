import React, { Component } from "react";
import { auth, createStuDocument } from "../config";
import firebaseConfig from "../config";
import DashBoard from "./Dashboard";
import "./Create.css";
import Swal from "sweetalert2";

class CreateStu extends Component {
  state = {
    stuname: "",
    stulastname: "",
    stuparent: "",
    email: "",
    password: "",
    stunum: "",
    croom: "",
    nroom: "",
    cid: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, stuname, stulastname, stuparent, stunum, croom, nroom, cid } =
      this.state;
    try {
      console.log(stuname, stulastname);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createStuDocument(user, {
        stuname,
        stulastname,
        stuparent,
        stunum,
        croom,
        nroom,
        cid,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "เพิ่มข้อมูลนักเรียนสำเร็จ",
        text: "โปรดเข้าสู่ระบบใหม่ทุกครั้งหลังสร้างบัญชีเสร็จ",
        timer: 2000,
        showConfirmButton: false,
      });
      firebaseConfig.auth().signOut();
      this.props.history.push("/");
    } catch (error) {
      console.log("error", error);
    }

    this.setState({
      stuname: "",
      stulastname: "",
      stuparent: "",
      stunum: "",
      croom: "",
      nroom: "",
      cid: "",
    });
  };

  render() {
    const {email, password, stuname, stulastname, stuparent, stunum, croom, nroom, cid } = this.state;
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <div>
          <form className="signup-login" onSubmit={this.handleSubmit}>
            <h2 className="text-center">เพิ่มนักเรียนใหม่</h2>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="อีเมลนักเรียนเพื่อใช้เข้าสู่ระบบ (ตัวอย่าง => รหัสนักเรียน@gmail.com)"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="รหัสผ่านเพื่อเข้าสู่ระบบ (ตัวอย่าง => รหัสนักเรียน)"
              required
            />
            <input
              type="text"
              name="stuname"
              value={stuname}
              onChange={this.handleChange}
              placeholder="ชื่อนักเรียน"
              required
            />
            <input
              type="text"
              name="stulastname"
              value={stulastname}
              onChange={this.handleChange}
              placeholder="นามสกุลนักเรียน"
              required
            />
            <input
              type="text"
              name="stuparent"
              value={stuparent}
              onChange={this.handleChange}
              placeholder="ชื่อ - นามสกุลผู้ปกครอง"
              required
            />
            <input
              type="text"
              name="stunum"
              value={stunum}
              onChange={this.handleChange}
              placeholder="รหัสนักเรียน"
              required
              pattern="[0-9]{6}"
            />
            <input
              type="text"
              name="croom"
              value={croom}
              onChange={this.handleChange}
              placeholder="ชั้นปี"
              required
              pattern="[1-6]{1}"
            />
            <input
              type="text"
              name="nroom"
              value={nroom}
              onChange={this.handleChange}
              placeholder="ห้องเรียน"
              required
              pattern="[1-6]{1}"
            />
            <input
              type="text"
              name="cid"
              value={cid}
              onChange={this.handleChange}
              placeholder="รหัสห้องเรียน (ตัวอย่าง ถ้าห้อง 1/1 ใส่ 11)"
              required
              pattern="[1-6]{2}"
            />
            <button className="btsi">เพิ่มนักเรียนใหม่</button>
          </form>
        </div>
      </>
    );
  }
}

export default CreateStu;

import React, { Component } from "react";
import { auth, createTeaDocument } from "../config";
import DashBoard from "./Dashboard";
import "./Create.css";
import Swal from "sweetalert2";

class Createtea extends Component {
  state = {
    teaname: "",
    tealastname: "",
    email: "",
    password: "",
    teanum: "",
    croom: "",
    nroom: "",
    cid: "",
    tel: "",
    room: "",
    sid: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      teaname,
      tealastname,
      email,
      password,
      teanum,
      croom,
      nroom,
      cid,
      tel,
      room,
      sid,
    } = this.state;
    try {
      console.log(email, teanum);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user, teanum);
      await createTeaDocument(user, {
        teaname,
        tealastname,
        teanum,
        croom,
        nroom,
        cid,
        tel,
        room,
        sid,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "เพิ่มข้อมูลคุณครูสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
      this.props.history.push("/");
    } catch (error) {
      console.log("error", error);
    }

    this.setState({
      teaname: "",
      tealastname: "",
      email: "",
      password: "",
      teanum: "",
      croom: "",
      nroom: "",
      cid: "",
      tel: "",
      room: "",
      sid: "",
    });
  };

  render() {
    const {
      teaname,
      tealastname,
      email,
      password,
      teanum,
      croom,
      nroom,
      cid,
      tel,
      room,
      sid,
    } = this.state;
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <div>
          <form className="signup-login" onSubmit={this.handleSubmit}>
            <h2 className="text-center">เพิ่มคุณครูใหม่</h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="อีเมลคุณครูเพื่อใช้เข้าสู่ระบบ (ตัวอย่าง => teacherรหัสคุณครู@gmail.com)"
              required
              attern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="รหัสผ่านเพื่อเข้าสู่ระบบ (ตัวอย่าง => รหัสคุณครู)"
              required
            />
            <input
              type="name"
              name="teaname"
              value={teaname}
              onChange={this.handleChange}
              placeholder="ชื่อคุณครู"
              required
            />
            <input
              type="name"
              name="tealastname"
              value={tealastname}
              onChange={this.handleChange}
              placeholder="นามสกุลคุณครู"
              required
            />
            <input
              type="text"
              name="teanum"
              value={teanum}
              onChange={this.handleChange}
              placeholder="รหัสคุณครู"
              required
              pattern="[0-9]{3}"
            />
            <input
              type="text"
              name="tel"
              value={tel}
              onChange={this.handleChange}
              placeholder="เบอร์ติดต่อคุณครู"
              required
              pattern="[0-9]{10}"
            />
            <input
              type="text"
              name="room"
              value={room}
              onChange={this.handleChange}
              placeholder="ห้องพักครู"
              required
            />
            {/* <input
              type="text"
              name="sid"
              value={sid}
              onChange={this.handleChange}
              placeholder="วิชาที่สอน"
              required
            /> */}
            <select
              className="form-select selectpicker"
              aria-label="Default select example"
              // multiple 
              name="sid"
              id={sid}
              onChange={this.handleChange}
            >
              <option value="" selected>
                เลือกวิชาที่สอน
              </option>
              <option value="thai1">ภาษาไทย ป.1</option>
              <option value="english1">ภาษาอังกฤษ ป.1</option>
              <option value="math1">คณิตศาสตร์ ป.1</option>
              <option value="science1">วิทยาศาสตร์ ป.1</option>
              <option value="computer1">คอมพิวเตอร์ ป.1</option>
              <option value="social1">สังคมศึกษา ป.1</option>
              <option value="pe1">สุขศึกษาและพลศึกษา ป.1</option>
              <option value="art1">ศิลปะ ป.1</option>
              <option value="career1">การงานอาชีพ ป.1</option>
              <option value="guidance1">แนะแนว ป.1</option>
              <option value="thai2">ภาษาไทย ป.2</option>
              <option value="english2">ภาษาอังกฤษ ป.2</option>
              <option value="math2">คณิตศาสตร์ ป.2</option>
              <option value="science2">วิทยาศาสตร์ ป.2</option>
              <option value="computer2">คอมพิวเตอร์ ป.2</option>
              <option value="social2">สังคมศึกษา ป.2</option>
              <option value="pe2">สุขศึกษาและพลศึกษา ป.2</option>
              <option value="art2">ศิลปะ ป.2</option>
              <option value="career2">การงานอาชีพ ป.2</option>
              <option value="guidance2">แนะแนว ป.2</option>
              <option value="thai3">ภาษาไทย ป.3</option>
              <option value="english3">ภาษาอังกฤษ ป.3</option>
              <option value="math3">คณิตศาสตร์ ป.3</option>
              <option value="science3">วิทยาศาสตร์ ป.3</option>
              <option value="computer3">คอมพิวเตอร์ ป.3</option>
              <option value="social3">สังคมศึกษา ป.3</option>
              <option value="pe3">สุขศึกษาและพลศึกษา ป.3</option>
              <option value="art3">ศิลปะ ป.3</option>
              <option value="career3">การงานอาชีพ ป.3</option>
              <option value="guidance3">แนะแนว ป.3</option>
              <option value="thai4">ภาษาไทย ป.4</option>
              <option value="english4">ภาษาอังกฤษ ป.4</option>
              <option value="math4">คณิตศาสตร์ ป.4</option>
              <option value="science4">วิทยาศาสตร์ ป.4</option>
              <option value="computer4">คอมพิวเตอร์ ป.4</option>
              <option value="social4">สังคมศึกษา ป.4</option>
              <option value="pe4">สุขศึกษาและพลศึกษา ป.4</option>
              <option value="art4">ศิลปะ ป.4</option>
              <option value="career4">การงานอาชีพ ป.4</option>
              <option value="guidance4">แนะแนว ป.4</option>
              <option value="thai5">ภาษาไทย ป.5</option>
              <option value="english5">ภาษาอังกฤษ ป.5</option>
              <option value="math5">คณิตศาสตร์ ป.5</option>
              <option value="science5">วิทยาศาสตร์ ป.5</option>
              <option value="computer5">คอมพิวเตอร์ ป.5</option>
              <option value="social5">สังคมศึกษา ป.5</option>
              <option value="pe5">สุขศึกษาและพลศึกษา ป.5</option>
              <option value="art5">ศิลปะ ป.5</option>
              <option value="career5">การงานอาชีพ ป.5</option>
              <option value="guidance5">แนะแนว ป.5</option>
              <option value="thai6">ภาษาไทย ป.6</option>
              <option value="english6">ภาษาอังกฤษ ป.6</option>
              <option value="math6">คณิตศาสตร์ ป.6</option>
              <option value="science6">วิทยาศาสตร์ ป.6</option>
              <option value="computer6">คอมพิวเตอร์ ป.6</option>
              <option value="social6">สังคมศึกษา ป.6</option>
              <option value="pe6">สุขศึกษาและพลศึกษา ป.6</option>
              <option value="art6">ศิลปะ ป.6</option>
              <option value="career6">การงานอาชีพ ป.6</option>
              <option value="guidance6">แนะแนว ป.6</option>
            </select>
            <input
              type="name"
              name="croom"
              value={croom}
              onChange={this.handleChange}
              placeholder="ชั้นปี"
              required
              pattern="[1-6]{1}"
            />
            <input
              type="name"
              name="nroom"
              value={nroom}
              onChange={this.handleChange}
              placeholder="ห้องเรียน"
              required
              pattern="[1-6]{1}"
            />
            <input
              type="name"
              name="cid"
              value={cid}
              onChange={this.handleChange}
              placeholder="รหัสห้องเรียน (ตัวอย่าง ถ้าห้อง 1/1 ใส่ 11)"
              required
              pattern="[1-6]{2}"
              title="กรุณากรอกตัวเลข 1 ถึง 6 จำนวน 2 ตัว"
            />
            <button className="btsi">เพิ่มคุณครูใหม่</button>
          </form>
        </div>
      </>
    );
  }
}

export default Createtea;

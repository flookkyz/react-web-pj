import React, { Component } from "react";
import { auth, createTeaDocument } from "../config";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
    sid: [],
  };

  options = [
    { value: "thai1", label: "ภาษาไทย ป.1" },
    { value: "english1", label: "ภาษาอังกฤษ ป.1" },
    { value: "math1", label: "คณิตศาสตร์ ป.1" },
    { value: "science1", label: "วิทยาศาสตร์ ป.1" },
    { value: "computer1", label: "คอมพิวเตอร์ ป.1" },
    { value: "social1", label: "สังคมศึกษา ป.1" },
    { value: "pe1", label: "สุขศึกษาและพลศึกษา ป.1" },
    { value: "art1", label: "ศิลปะ ป.1" },
    { value: "career1", label: "การงานอาชีพ ป.1" },
    { value: "guidance1", label: "แนะแนว ป.1" },
    { value: "thai2", label: "ภาษาไทย ป.2" },
    { value: "english2", label: "ภาษาอังกฤษ ป.2" },
    { value: "math2", label: "คณิตศาสตร์ ป.2" },
    { value: "science2", label: "วิทยาศาสตร์ ป.2" },
    { value: "computer2", label: "คอมพิวเตอร์ ป.2" },
    { value: "social2", label: "สังคมศึกษา ป.2" },
    { value: "pe2", label: "สุขศึกษาและพลศึกษา ป.2" },
    { value: "art2", label: "ศิลปะ ป.2" },
    { value: "career2", label: "การงานอาชีพ ป.2" },
    { value: "guidance2", label: "แนะแนว ป.2" },
    { value: "thai3", label: "ภาษาไทย ป.3" },
    { value: "english3", label: "ภาษาอังกฤษ ป.3" },
    { value: "math3", label: "คณิตศาสตร์ ป.3" },
    { value: "science3", label: "วิทยาศาสตร์ ป.3" },
    { value: "computer3", label: "คอมพิวเตอร์ ป.3" },
    { value: "social3", label: "สังคมศึกษา ป.3" },
    { value: "pe3", label: "สุขศึกษาและพลศึกษา ป.3" },
    { value: "art3", label: "ศิลปะ ป.3" },
    { value: "career3", label: "การงานอาชีพ ป.3" },
    { value: "guidance3", label: "แนะแนว ป.3" },
    { value: "thai4", label: "ภาษาไทย ป.4" },
    { value: "english4", label: "ภาษาอังกฤษ ป.4" },
    { value: "math4", label: "คณิตศาสตร์ ป.4" },
    { value: "science4", label: "วิทยาศาสตร์ ป.4" },
    { value: "computer4", label: "คอมพิวเตอร์ ป.4" },
    { value: "social4", label: "สังคมศึกษา ป.4" },
    { value: "pe4", label: "สุขศึกษาและพลศึกษา ป.4" },
    { value: "art4", label: "ศิลปะ ป.4" },
    { value: "career4", label: "การงานอาชีพ ป.4" },
    { value: "guidance4", label: "แนะแนว ป.4" },
    { value: "thai5", label: "ภาษาไทย ป.5" },
    { value: "english5", label: "ภาษาอังกฤษ ป.5" },
    { value: "math5", label: "คณิตศาสตร์ ป.5" },
    { value: "science5", label: "วิทยาศาสตร์ ป.5" },
    { value: "computer5", label: "คอมพิวเตอร์ ป.5" },
    { value: "social5", label: "สังคมศึกษา ป.5" },
    { value: "pe5", label: "สุขศึกษาและพลศึกษา ป.5" },
    { value: "art5", label: "ศิลปะ ป.5" },
    { value: "career5", label: "การงานอาชีพ ป.5" },
    { value: "guidance5", label: "แนะแนว ป.5" },
    { value: "thai6", label: "ภาษาไทย ป.6" },
    { value: "english6", label: "ภาษาอังกฤษ ป.6" },
    { value: "math6", label: "คณิตศาสตร์ ป.6" },
    { value: "science6", label: "วิทยาศาสตร์ ป.6" },
    { value: "computer6", label: "คอมพิวเตอร์ ป.6" },
    { value: "social6", label: "สังคมศึกษา ป.6" },
    { value: "pe6", label: "สุขศึกษาและพลศึกษา ป.6" },
    { value: "art6", label: "ศิลปะ ป.6" },
    { value: "career6", label: "การงานอาชีพ ป.6" },
    { value: "guidance6", label: "แนะแนว ป.6" },
  ];

  animatedComponents = makeAnimated();

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
      sid: [],
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
            <button className="btsi">เพิ่มคุณครูใหม่</button>
          </form>
        </div>
      </>
    );
  }
}

export default Createtea;

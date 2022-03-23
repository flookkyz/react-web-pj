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
      email,
      password,
      teaname,
      tealastname,
      teanum,
      croom,
      nroom,
      cid,
      tel,
      room,
      sid,
    } = this.state;
    try {
      console.log(teaname, teanum);
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
            <select className="form-select" aria-label="Default select example" name="sid" id={sid} onChange={this.handleChange}>
              <option value="" selected>เลือกวิชาที่สอน</option>
              <option value="11">ภาษาไทย ป.1</option>
              <option value="21">ภาษาอังกฤษ ป.1</option>
              <option value="31">คณิตศาสตร์ ป.1</option>
              <option value="41">วิทยาศาสตร์ ป.1</option>
              <option value="51">คอมพิวเตอร์ ป.1</option>
              <option value="61">สังคมศึกษา ป.1</option>
              <option value="71">สุขศึกษาและพลศึกษา ป.1</option>
              <option value="81">ศิลปะ ป.1</option>
              <option value="91">การงานอาชีพ ป.1</option>
              <option value="101">แนะแนว ป.1</option>
              <option value="12">ภาษาไทย ป.2</option>
              <option value="22">ภาษาอังกฤษ ป.2</option>
              <option value="32">คณิตศาสตร์ ป.2</option>
              <option value="42">วิทยาศาสตร์ ป.2</option>
              <option value="52">คอมพิวเตอร์ ป.2</option>
              <option value="62">สังคมศึกษา ป.2</option>
              <option value="72">สุขศึกษาและพลศึกษา ป.2</option>
              <option value="82">ศิลปะ ป.2</option>
              <option value="92">การงานอาชีพ ป.2</option>
              <option value="102">แนะแนว ป.2</option>
              <option value="13">ภาษาไทย ป.3</option>
              <option value="23">ภาษาอังกฤษ ป.3</option>
              <option value="33">คณิตศาสตร์ ป.3</option>
              <option value="43">วิทยาศาสตร์ ป.3</option>
              <option value="53">คอมพิวเตอร์ ป.3</option>
              <option value="63">สังคมศึกษา ป.3</option>
              <option value="73">สุขศึกษาและพลศึกษา ป.3</option>
              <option value="83">ศิลปะ ป.3</option>
              <option value="93">การงานอาชีพ ป.3</option>
              <option value="103">แนะแนว ป.3</option>
              <option value="14">ภาษาไทย ป.4</option>
              <option value="24">ภาษาอังกฤษ ป.4</option>
              <option value="34">คณิตศาสตร์ ป.4</option>
              <option value="44">วิทยาศาสตร์ ป.4</option>
              <option value="54">คอมพิวเตอร์ ป.4</option>
              <option value="64">สังคมศึกษา ป.4</option>
              <option value="74">สุขศึกษาและพลศึกษา ป.4</option>
              <option value="84">ศิลปะ ป.4</option>
              <option value="94">การงานอาชีพ ป.4</option>
              <option value="104">แนะแนว ป.4</option>
              <option value="15">ภาษาไทย ป.5</option>
              <option value="25">ภาษาอังกฤษ ป.5</option>
              <option value="35">คณิตศาสตร์ ป.5</option>
              <option value="45">วิทยาศาสตร์ ป.5</option>
              <option value="55">คอมพิวเตอร์ ป.5</option>
              <option value="65">สังคมศึกษา ป.5</option>
              <option value="75">สุขศึกษาและพลศึกษา ป.5</option>
              <option value="85">ศิลปะ ป.5</option>
              <option value="95">การงานอาชีพ ป.5</option>
              <option value="105">แนะแนว ป.5</option>
              <option value="16">ภาษาไทย ป.6</option>
              <option value="26">ภาษาอังกฤษ ป.6</option>
              <option value="36">คณิตศาสตร์ ป.6</option>
              <option value="46">วิทยาศาสตร์ ป.6</option>
              <option value="56">คอมพิวเตอร์ ป.6</option>
              <option value="66">สังคมศึกษา ป.6</option>
              <option value="76">สุขศึกษาและพลศึกษา ป.6</option>
              <option value="86">ศิลปะ ป.6</option>
              <option value="96">การงานอาชีพ ป.6</option>
              <option value="106">แนะแนว ป.6</option>
              
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

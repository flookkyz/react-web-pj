import React, { Component } from 'react';
import { auth, createStuDocument } from '../config';
import DashBoard from "./Dashboard";
import "./Create.css";

class CreateStu extends Component {
  state = { stuname: '', email: '', password: '', stunum: '', croom:'', nroom:'', cid:'' };

  
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, stuname, stunum, croom, nroom, cid } = this.state;
    try {
      console.log(stuname, stunum);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user,stunum);
      await createStuDocument(user, { stuname, stunum, croom, nroom, cid });
      this.props.history.push("/student");
    } catch (error) {
      console.log('error', error);
    }

    this.setState({ stuname: '', email: '', password: '', stunum: '', croom:'', nroom:'', cid:'' });
  };

  render() {
    const { stuname, email, password, stunum, croom, nroom, cid } = this.state;
    return (
      <>
      <header>
        <DashBoard />
      </header>
      <div>
        <form className="signup-login" onSubmit={this.handleSubmit}>
          <h2 className="text-center">เพิ่มนักเรียนใหม่</h2>

          <input
            type="name"
            name="stuname"
            value={stuname}
            onChange={this.handleChange}
            placeholder="ชื่อนักเรียน"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="อีเมลนักเรียนเพื่อใช้เข้าสู่ระบบ (ตัวอย่าง => รหัสนักเรียน@gmail.com)"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="รหัสผ่านเพื่อเข้าสู่ระบบ (ตัวอย่าง => รหัสนักเรียน)"
          />
          <input
            type="text"
            name="stunum"
            value={stunum}
            onChange={this.handleChange}
            placeholder="รหัสนักเรียน"
          />
          <input
            type="name"
            name="croom"
            value={croom}
            onChange={this.handleChange}
            placeholder="ชั้นปี"
          />
          <input
            type="name"
            name="nroom"
            value={nroom}
            onChange={this.handleChange}
            placeholder="ห้องเรียน"
          />
          <input
            type="name"
            name="cid"
            value={cid}
            onChange={this.handleChange}
            placeholder="รหัสห้องเรียน (ตัวอย่าง ถ้าห้อง 1/1 ใส่ 11)"
          />
          <button className="btsi">เพิ่มนักเรียนใหม่</button>
        </form>
      </div>
      </>
    );
  }
}

export default CreateStu;
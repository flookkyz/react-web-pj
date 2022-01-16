import React, { Component } from 'react';
import { auth, createTeaDocument } from '../config';
import DashBoard from "./Dashboard";
import "./Create.css";

class Createtea extends Component {
  state = { teaname: '', email: '', password: '', teanum: '', croom:'', nroom:'' };

  
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, teaname, teanum, croom, nroom } = this.state;
    try {
      console.log(teaname, teanum);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user,teanum);
      await createTeaDocument(user, { teaname, teanum, croom, nroom });
      this.props.history.push("/teacher");
    } catch (error) {
      console.log('error', error);
    }

    this.setState({ teaname: '', email: '', password: '', teanum: '', croom:'', nroom:'' });
  };

  render() {
    const { teaname, email, password, teanum, croom, nroom } = this.state;
    return (
      <>
      <header>
        <DashBoard />
      </header>
      <div>
        <form className="signup-login" onSubmit={this.handleSubmit}>
          <h2 className="text-center">เพิ่มคุณครูใหม่</h2>

          <input
            type="name"
            name="teaname"
            value={teaname}
            onChange={this.handleChange}
            placeholder="ชื่อคุณครู"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="อีเมลคุณครูเพื่อใช้เข้าสู่ระบบ (ตัวอย่าง => รหัสคุณครู@gmail.com)"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="รหัสผ่านเพื่อเข้าสู่ระบบ (ตัวอย่าง => รหัสคุณครู)"
          />
          <input
            type="text"
            name="teanum"
            value={teanum}
            onChange={this.handleChange}
            placeholder="รหัสคุณครู"
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
          <button className="btsi">เพิ่มคุณครูใหม่</button>
        </form>
      </div>
      </>
    );
  }
}

export default Createtea;
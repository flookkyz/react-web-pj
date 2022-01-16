import React, { Component } from 'react';
import { auth, createTeaDocument } from '../config';
import DashBoard from "./Dashboard";
import "./Create.css";

class Singup extends Component {
  state = { stuname: '', email: '', password: '', stunum: '', croom:'', nroom:'' };

  
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, stuname, stunum, croom, nroom } = this.state;
    try {
      console.log(stuname, stunum);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user,stunum);
      await createTeaDocument(user, { stuname, stunum, croom, nroom });
      this.props.history.push("/");
    } catch (error) {
      console.log('error', error);
    }

    this.setState({ stuname: '', email: '', password: '', stunum: '', croom:'', nroom:'' });
  };

  render() {
    const { stuname, email, password, stunum, croom, nroom } = this.state;
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
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="stunum"
            value={stunum}
            onChange={this.handleChange}
            placeholder="StudentID"
          />
          <input
            type="name"
            name="croom"
            value={croom}
            onChange={this.handleChange}
            placeholder="Class"
          />
          <input
            type="name"
            name="nroom"
            value={nroom}
            onChange={this.handleChange}
            placeholder="Room"
          />
          <button className="btsi">Signup</button>
        </form>
      </div>
      </>
    );
  }
}

export default Singup;
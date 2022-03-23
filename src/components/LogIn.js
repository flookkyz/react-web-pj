import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import "./LogIn.css";

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fullarea ">
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="card box shadowbox">
              <div className="text-center">
                <br />
                <br />
                <div className="text-center">
                  <h1 className="logotext">TIME ATTENDANCE</h1>
                </div>
              </div>
              <br />
              <br />
              <div className="my-4"></div>
              <div className="form">
                <label htmlFor="email" className="from-label"></label>
                <FaUserAlt className="fa lgicon" />
                <input
                  type="email"
                  name="email"
                  className="text-center inputtext rounded-pill"
                  placeholder="อีเมล"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form my-2">
                <label
                  htmlFor="exampleInputPassword1"
                  className="from-label"
                ></label>
                <FaKey className="fa lgicon" />
                <input
                  type="password"
                  name="password"
                  className="text-center inputtext rounded-pill"
                  placeholder="รหัสผ่าน"
                  id="exampleInputPassword1"
                />
              </div>
              <br />
              <br />
              <div className="d-grid gap-2 col-4 mx-auto">
                <button
                  className="buttonp text-white rounded-pill my-3"
                  type="submit"
                >
                  เข้าสู่ระบบ
                </button>
                <br />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LogIn;

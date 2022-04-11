import React, { useState } from "react";
import { storage } from "../config";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "./Create.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const ref = storage.ref(`/table/${file.name}`);
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setFile(null);
        setURL(url);
        firebase.firestore().collection("tables").doc(this.props.match.params.id).update({
          urlPic: url,
        });
      });
    });
  }

  return (
    <div className="text-center">
      <form className="signup-login text-center" onSubmit={handleUpload}>
        <h2 className="text-center">แก้ไขตารางเรียน</h2>
        <div className="form-group ">
          <input className="form-control" type="file" onChange={handleChange} />
          {/* <br /> */}
          <button className="btn btn-success bt " disabled={!file}>
            upload to firebase
          </button>
          <br />
          <br />
          <img className="pic" src={url} alt="" height={400} />
          
          <br />
          <Link to="/table">
            <button className="btn btn-success bt ">go to table</button>
          </Link>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

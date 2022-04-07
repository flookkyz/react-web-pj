import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../config";
import "./Allpage.css";
import { CSVLink } from "react-csv";
import DashBoard from "./Dashboard";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ReportScore = () => {
  let { ids } = useParams();
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const list = [];
  console.log("ids", ids);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      firebase
        .firestore()
        .collection("teachers")
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          firebase
            .firestore()
            .collection("students")
            .doc(ids)
            .collection(documentSnapshot.data().sj)
            .get()
            .then((userSnapshot) => {
              userSnapshot.forEach((doc) => {
                const { note, score } = doc.data();
                setID(doc.data().usersID);
                list.push({
                  usersID: doc.id,
                  score: score,
                  note: note,
                });
              });
              setData(list);
              console.log("####", list);
            });
        });
    });
  }, []);
  console.log("####test", list);
  const headers = [
    // here all the keys give undefined.
    { label: "User", key: "usersID" },
    { label: "score", key: "score" },
    { label: "note", key: "note" },
  ];
  // setData(list);
  console.log("data", data);

  const csvReport = {
    filename: "userReport.csv",
    headers: headers,
    data: data,
    // also my data useState is undefined, although it holds values and i can see them in my table
  };

  return (
    <>
      <header>
        <DashBoard />
      </header>
      <br />
      <div className="container text-center">
        <div className="d-flex justify-content-center mt-3">
          <div class="position-absolute top-10 start-0">
            &nbsp;&nbsp;&nbsp;
            <Link to={`/showscore/${ids}`}>
            <BsFillArrowLeftCircleFill className="iconback" />
            </Link>
          </div>
          <span className="text text-center">ดาวน์โหลดคะแนนนักเรียน</span>
        </div>

        <div className="position-absolute top-50 start-50 translate-middle">
          <CSVLink
            className="btn btn-outline-warning bt"
            data={data}
            headers={headers}
            filename={"ReportScore.csv"}
          >
            ดาวน์โหลดคะแนน
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default ReportScore;

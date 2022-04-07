import React, { useState, useEffect } from "react";
import firebase from "../config";
import "./Allpage.css";
import { CSVLink } from "react-csv";

const ReportScore = () => {
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const list = [];
  useEffect(() => {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((userSnapshot) => {
        userSnapshot.forEach((doc) => {
          const { cid, croom } = doc.data();
          setID(doc.data().usersID);
          list.push({
            usersID: doc.id,
            cid: cid,
            croom: croom,
          });
        });
        setData(list);
        console.log("####", list);
      });
      
  }, [],);
  console.log("####test", list);
  const headers = [
    // here all the keys give undefined.
    { label: "User", key: data.usersID },
    { label: "cid", key: data.cid },
    { label: "croom", key: data.croom },
  ];
  // setData(list);
  console.log("data", data)
  
  const csvReport = {
    filename: "userReport.csv",
    headers: headers,
    data: list,
    // also my data useState is undefined, although it holds values and i can see them in my table
  };

  return <CSVLink {...csvReport}>Export</CSVLink>;
};

export default ReportScore;



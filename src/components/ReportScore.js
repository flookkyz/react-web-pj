import React, { useState, useEffect } from "react";
import firebase from "../config";
import "./Allpage.css";
import { CSVLink } from "react-csv";

const ReportScore = () => {
  const [data, setData] = useState([]);
  // const [id, setID] = useState("");
  // const list = [];
  useEffect(() => {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((userSnapshot) => {
        const usersData = [];
        userSnapshot.forEach((doc) => {
          const { cid, croom } = doc.data();
          const userData ={
            usersID: doc.id,
            cid: cid,
            croom: croom,
          };
          const headers = [
            // here all the keys give undefined.
            { label: "User", key: doc.id },
            { label: "cid", key: cid },
            { label: "croom", key: croom },
          ];
          console.log("data",userData);
          const csvReport = {
            filename: "userReport.csv",
            headers: headers,
            data: userData,
            // also my data useState is undefined, although it holds values and i can see them in my table
          };
          usersData.push(csvReport);
        });
        setData(usersData);
      });
      
  }, [],);
  
  

  return <CSVLink {...data}>Export</CSVLink>;
};

export default ReportScore;



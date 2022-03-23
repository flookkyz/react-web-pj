import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { CSVLink } from "react-csv";

function ReportScore() {
  const [data, setData] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((userSnapshot) => {
        console.log("##", userSnapshot.forEach);
        const usersData = [];
        userSnapshot.forEach((doc) => {
          const {
            cid,
            croom,
            email,
            nroom,
            stulastname,
            stuname,
            stunum,
            uid,
          } = doc.data();
          const userData = {
            userID: doc.id,
            cid: cid,
            croom: croom,
            email: email,
            nroom: nroom,
            stulastname: stulastname,
            stuname: stuname,
            stunum: stunum,
            uid: uid,
          };
          const headers = [
            // here all the keys give undefined.
            { label: "User", key: uid },
            { label: "cid", key: cid },
            { label: "Nacroomme", key: croom },
            { label: "email", key: email },
            { label: "nroom", key: nroom },
            { label: "stulastname", key: stulastname },
            { label: "stuname", key: stuname },
            { label: "stunum", key: stunum },
          ];
          const csvReport = {
            filename: "userReport.csv",
            headers: headers,
            data: userData,
          };
          usersData.push(csvReport);
        });
        setData(usersData);
      });
  }, []);

  return <CSVLink data={data}>Export</CSVLink>;
}

export default ReportScore;

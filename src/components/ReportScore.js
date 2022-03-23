import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { CSVLink } from "react-csv";

function ReportScore() {
  const [data, setData] = useState({
    filename: "userReport.csv",
    headers: [],
    data: [],
  });
  const [id, setID] = useState("");
  const filteredList = [];
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
            .doc()
            .collection(`${documentSnapshot.data().sj}`)
            .get()
            .then((userSnapshot) => {
              console.log("##",user.key);
              let list = [];
              userSnapshot.forEach((doc) => {
                const { score, note } = doc.data();
                setID(doc.data().usersID);
                list.push({
                  usersID: doc.id,
                  score: score,
                  note: note,
                });
              });

              const headers = [
                // I'm not sure why you need this key
                // but if it's only for uniqueness
                // you can replace them by unique strings like
                // { label: "User", key: "user" },
                // { label: "Account", key: "account" },

                { label: "User", key: "usersID" },
                { label: "note", key: "note" },
                { label: "score", key: "score" },
              ];

              const csvReport = {
                filename: "userReport.csv",
                headers: headers,
                data: list,
              };
              setData(csvReport);
            });
        });
    });
  }, []);

  


  return <CSVLink {...data}>Export</CSVLink>;
}

export default ReportScore;

import React, { Component } from "react";
import firebase from "firebase";
import { CSVLink } from "react-csv";

class ReportScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      
    };
    console.log("##state",this.state.key)
  }

  exportcsv  ()  {
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
            .doc(this.state.key)
            .collection(`${documentSnapshot.data().sj}`)
            .get()
            .then((userSnapshot) => {
              console.log("##key", this.state.key);
              let list = [];
              userSnapshot.forEach((doc) => {
                console.log("##Each", userSnapshot.forEach(doc));
                const { score, note } = doc.data();
                list.push({
                  usersID: doc.id,
                  score: score,
                  note: note,
                });
              });

              const headers = [
                { label: "User", key: "usersID" },
                { label: "note", key: "note" },
                { label: "score", key: "score" },
              ];

              const csvReport = {
                filename: "userReport.csv",
                headers: headers,
                data: list,
              };
            });
        });
    });
  };
  render() {
    return (
      <>
        <h1>test</h1>
      </>
    );
  }
}

export default ReportScore;

{
  /* <CSVLink {...data}>Export</CSVLink>; */
}

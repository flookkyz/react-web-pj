import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import "./Create.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

class EditScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      jobnum: "",
      score: "",
      note: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("students")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          students: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onSubmit = () => {
    const { jobnum, score, note } = this.state;
    console.log("jb=", jobnum, "sc=",score, "note",note);
    firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;
        console.log("uid = ", uid);
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
            .doc(`${jobnum}`)
            .set({
                'score': score,
                'note': note,
            });
          });
          
          this.props.history.push("/score");
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { jobnum, score , note } = this.state;
    return (
      <>
        <div class="position-absolute top-10 start-0">
          &nbsp;&nbsp;&nbsp;
          <Link to={`/score`}>
            <BsFillArrowLeftCircleFill className="iconbacktop" />
          </Link>
        </div>
        <form className="signup-login" onSubmit={this.onSubmit}>
          <div className="container text-center">
            <div className="panel panel-default">
              <div className="panel-body">
                <br />
                <br />
                <label className="mx-3" htmlFor="">????????????????????????????????????????????? :</label>
                <input
                  type="text"
                  name="jobnum"
                  value={jobnum}
                  onChange={this.handleChange}
                  placeholder="????????????????????????????????? 1 ???????????? 1"
                  required
                />
                <br />
                <label className="mx-4" htmlFor="">??????????????????????????? :</label>
                <input

                  type="text"
                  name="score"
                  value={score}
                  onChange={this.handleChange}
                  placeholder="???????????????????????????????????????????????????"
                  required
                />
                <br />
                <label className="mx-2" htmlFor="">?????????????????????????????????????????? :</label>
                <input

                  type="text"
                  name="note"
                  value={note}
                  onChange={this.handleChange}
                  placeholder="????????????????????????????????????????????????????????????"
                  required
                />
                <br />
                <br />
                <button className="btn btn-success bt ">??????????????????????????????</button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default EditScore;

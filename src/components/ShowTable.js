import React, { Component } from "react";
import firebase from "../config";
import { Link } from "react-router-dom";
import DashBoard from "./Dashboard";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

class ShowTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: {},
      key: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("tables")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          tables: doc.data(),
          key: doc.id,
          isLoading: false,
        });
        console.log("url = ",this.state.tables.urlPic);
      } else {
        console.log("No such document!");
      }
    });
  }


  render() {
    return (
      <>
        <header>
          <DashBoard />
        </header>
        <div class="container text-center">
          <div class="panel panel-default">
            <div class="panel-body">
              <br /><br />
              <div class="position-absolute top-10 start-0">
                &nbsp;&nbsp;&nbsp;
                <Link to={`/table`}>
                  <BsFillArrowLeftCircleFill className="iconback" />
                </Link>
              </div>
              <dl>
                <dt>รูปภาพตารางเรียน  : </dt>
                <br />
                <dd><img src={this.state.tables.urlPic} alt="table" width={800} height={400} /></dd>
              </dl>
              <br />
              <Link to={`/edittable/${this.state.key}`} class="btn btn-success bt">
              แก้ไข
              </Link>
              &nbsp;
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShowTea;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";
import Student from "./components/Student";
import EditStu from "./components/EditStu";
import CreateStu from "./components/CreateStu";
import Showstu from "./components/ShowStu";
import Teacher from "./components/Teacher";
import CreateTea from "./components/CreateTea";
import ShowTea from "./components/ShowTea";
import EditTea from "./components/EditTea";
import CreateTable from "./components/CreateTable";
import Pagenotfound from "./components/Pagenotfound";
import ImageUpload from "./components/ImageUpload";
import Table from "./components/Table";
import ShowTable from "./components/ShowTable";
import Score from "./components/Score";
import EditScore from "./components/EditScore";
import QRCode from "./components/QRCode";
import ReportScore from "./components/ReportScore";
import ShowScore from "./components/ShowScore";
import ReScore from "./components/ReScore";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/homeadmin" component={HomeAdmin} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/student" component={Student} />
          <Route path="/editstu/:id" component={EditStu} />
          <Route path="/createstu" component={CreateStu} />
          <Route path="/showstu/:id" component={Showstu} />
          <Route exact path="/teacher" component={Teacher} />
          <Route path="/createtea" component={CreateTea} />
          <Route path="/showtea/:id" component={ShowTea} />
          <Route path="/edittea/:id" component={EditTea} />
          <Route path="/edittable/:id" component={CreateTable} />
          <Route path="/imgupload" component={ImageUpload} />
          <Route path="/table" component={Table} />
          <Route path="/showtable/:id" component={ShowTable} />
          <Route path="/score" component={Score} />
          <Route path="/addscore/:id" component={EditScore} />
          <Route path="/updateclass" component={QRCode} />
          <Route path="/showscore/:id" component={ShowScore} />
          <Route path="/reportscore/:ids" component={ReportScore} />
          <Route path="/rescore/:uid/:id" component={ReScore} />
          <Route component={Pagenotfound} />
        </Switch>
      </Router>
    </AuthProvider>

    // WEB BY ANUCHIT
  );
}

export default App;

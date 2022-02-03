import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
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


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/student" component={Student} />
          <Route path="/editstu/:id" component={EditStu} />
          <Route path="/createstu" component={CreateStu} />
          <Route path="/showstu/:id" component={Showstu} />
          <Route exact path="/teacher" component={Teacher} />
          <Route path="/createtea" component={CreateTea} />
          <Route path="/showtea/:id" component={ShowTea} />
          <Route path="/edittea/:id" component={EditTea} />
          <Route path="/createtable" component={CreateTable} />
          <Route component={Pagenotfound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

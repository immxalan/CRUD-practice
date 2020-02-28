import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import AnimalDashboard from "./components/AnimalDashboard.js";
import PrivateRoute from "./components/utils/PrivateRoute";
import Login from "./components/Login.js";
import Header from "./components/Header.js";

export default function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        {/* Build out a Private Route */}
        <PrivateRoute exact path ="/creatures" component={AnimalDashboard}/>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

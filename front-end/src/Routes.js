import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import InsertPatient from "./containers/InsertPatient";
import UpdatePatient from "./containers/UpdatePatient";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/" component={Home} exact />
                <Route path="/atualizar" component={UpdatePatient} exact />
                <Route path="/cadastrar" component={InsertPatient} exact />
            </Switch>
        </BrowserRouter>
    )
}

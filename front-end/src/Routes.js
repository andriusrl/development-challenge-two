import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import UpdatePatient from "./containers/UpdatePatient";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/atualizar" component={UpdatePatient} exact />
            </Switch>
        </BrowserRouter>
    )
}

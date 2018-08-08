import React from 'react';
import { Route, Switch } from 'react-router'
import Login from "../components/Login/Login"
import App from "../components/App/App";
import EmailList from "../components/email/EmailList"
import Main from "../components/App/Main";

const rootRouter = (
    <div>
      <Switch>
        <Route exact path="/ygoa" component={Login}/>
        <Route path="/ygoa/App" component={App} />
        <Route component={Login}/>
      </Switch>
    </div>
)

export default rootRouter
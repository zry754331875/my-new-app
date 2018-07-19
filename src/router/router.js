import React from 'react';
import { Route, Switch } from 'react-router'
import Login from "../components/Login/Login"
import App from "../components/App/App";

const rootRouter = (
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/App" component={App}/>
      </Switch>
    </div>
)

export default rootRouter
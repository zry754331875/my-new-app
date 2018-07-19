import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store,history } from "./Store/store";
import router from "./router/router";

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}> 
      {router}
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

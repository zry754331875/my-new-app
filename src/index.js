import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store,history } from "./Store/store";
import router from "./router/router";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}> 
      <LocaleProvider locale={zh_CN}>
        {router}
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

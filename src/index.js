import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from '../src/components/Login/Login';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./Store/store";
ReactDOM.render(
    <Provider store={store}>
    <Login />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

import { createHashHistory,createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { rootReducers } from "../Reducers/index";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  connectRouter(history)(rootReducers), // new root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      sagaMiddleware
    ),
  ),
)

sagaMiddleware.run(rootSaga)
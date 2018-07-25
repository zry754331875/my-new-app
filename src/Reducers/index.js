import { combineReducers } from "redux";
import LoginR from './LoginR'
import AppR from './AppR'

export const rootReducers = combineReducers({
    Login:LoginR,
    App:AppR,
})
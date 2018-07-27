import { combineReducers } from "redux";
import LoginR from './LoginR'
import AppR from './AppR'
import EmailR from './EmailReducer'

export const rootReducers = combineReducers({
    Login:LoginR,
    App:AppR,
    Email:EmailR,
})
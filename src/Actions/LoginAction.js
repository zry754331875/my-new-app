import { createAction } from "redux-actions";
import * as LoginType from "../Contants/LoginType";
export function  onLogin(userName,password){
    return async (dispatch,getState)=>{
        dispatch(createAction(LoginType.ON_LOGIN_START)({userName:userName,password:password}))

        // 假装在请求数据
        if(userName === 'admin' && password === '123456')
        {
            setTimeout(()=>{
                dispatch(createAction(LoginType.ON_LOGIN_SUCCESS)())
                dispatch(createAction(LoginType.ON_LOGIN_CLEAR)())
            },5000)
        }
        else
        {
            setTimeout(()=>{
                dispatch(createAction(LoginType.ON_LOGIN_ERROR)())
                dispatch(createAction(LoginType.ON_LOGIN_CLEAR)())
            },5000)
        }
    }
}
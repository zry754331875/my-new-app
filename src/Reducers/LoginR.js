import { handleActions } from "redux-actions";
import * as LoginType from "../Contants/LoginType";
import * as AppType from "../Contants/AppType";

const defaultState = {
    userName:'',
    password:'',
    remember:true,
    loginError:null,
    isSuccess:false,
    isLoading:false,
    shouldShowError:false,
    shouldShowSuccess:false,
}

export default handleActions({
    [LoginType.ON_LOGIN_START]:(state,action)=>{

        const {userName,password} = action.payload

        return {
            ...state,
            userName:userName,
            password:password,
            loginError:null,
            isLoading:true,
        }
    },
    [LoginType.ON_LOGIN_SUCCESS]:(state)=>{
        
        return {
            ...state,
            isSuccess:true,
            isLoading:false,
            shouldShowSuccess:true,
        }
    },
    [LoginType.ON_LOGIN_ERROR]:(state)=>{
        return {
            ...state,
            loginError:{message:'登录失败',},
            isSuccess:false,
            isLoading:false,
        }
    },
    [LoginType.ON_LOGIN_CLEAR]:(state)=>{
        return {
            ...state,
            isSuccess:false,
            isLoading:false,
            loginError:null,
        }
    },
    [AppType.LOGIN_OUT]:(state)=>{
        return {
            ...state,
            userName:'',
            password:'',
            remember:false,
            loginError:null,
            isSuccess:false,
            isLoading:false,
            shouldShowError:false,
            shouldShowSuccess:false,
        }
    }
},defaultState)
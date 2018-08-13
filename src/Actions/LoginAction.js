import { createAction } from "redux-actions";
import * as LoginType from "../Contants/LoginType";
import { push } from 'connected-react-router'

export function  onLogin(userName,password){
    return async (dispatch,getState)=>{
        dispatch(createAction(LoginType.ON_LOGIN_START)({userName:userName,password:password}))

        // 假装在请求数据
        if(userName === 'admin' && password === '123456')
        {
            setTimeout(()=>{
                dispatch(createAction(LoginType.ON_LOGIN_SUCCESS)())
                dispatch(createAction(LoginType.ON_LOGIN_CLEAR)())
                dispatch(push('/App'))
            },2500)
        }
        else
        {
            try {
                let response = await fetch('/ygoa/ydpt/loginYdpt.action?userName=033216&password=08a78c94b2889ab9a86704efe7133602',{
                method:'GET',
                headers:{
                    'X-Innovate-Rsbm':'4CEE735A-E182-4D8A-85C8-90B3774AFF2F',
                    'X-Innovate-Application':'OA',
                },
                credentials:'include',
                })
    
                let json = await response.text()
                console.log(json)
                let response1 = await fetch('/ygoa/ydpt/loadMyTask.action',{
                    method:'GET',
                    headers:{
                        'X-Innovate-Rsbm':'4CEE735A-E182-4D8A-85C8-90B3774AFF2F',
                        'X-Innovate-Application':'OA',   
                    },
                    credentials:'include',
                })

                let json1 = await response1.text()
                dispatch(createAction(LoginType.ON_LOGIN_ERROR)())
                console.log(json1)
            }catch(error){
                console.log(error)
                dispatch(createAction(LoginType.ON_LOGIN_ERROR)())
            }
            // setTimeout(()=>{
            //     dispatch(createAction(LoginType.ON_LOGIN_ERROR)())
            //     dispatch(createAction(LoginType.ON_LOGIN_CLEAR)())
            // },2500)
        }
    }
}
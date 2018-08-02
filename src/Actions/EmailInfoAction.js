import { createAction } from "redux-actions";
import * as EmailTypes from "../Contants/EmailTypes";

export function getEmailInfo(id,folder){
    return async dispatch=>{

        dispatch(createAction(EmailTypes.EMAIL_INFO_FETCH_START)())

        try {
            let response = await fetch('http://oayj.yong-gang.cn:8080/innovate-api/v1/mail/getMessage?'+'account=033216&folder='+folder+'&msgID='+id,{
                method:'GET',
                headers:{
                    'X-Innovate-Rsbm':'4CEE735A-E182-4D8A-85C8-90B3774AFF2F',
                    'X-Innovate-Application':'OA'
                }
            })

            let json = await response.json()

            let data = json.result.mail

            dispatch(createAction(EmailTypes.EMAIL_INFO_FETCH_SUCCESS)(data))

            console.log(json)
        }
        catch(error){
            console.error(error)
            dispatch(createAction(EmailTypes.EMAIL_INFO_FETCH_ERROR)(error))
        }
    }
}


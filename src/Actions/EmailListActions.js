import { createAction } from "redux-actions";
import * as EmailTypes from "../Contants/EmailTypes";
import { push } from "connected-react-router";

export function getList(folder,pagination){
    return async (dispatch,getState)=>{

        dispatch(createAction(EmailTypes.EMAIL_LIST_FETCH_START)())

        let {pageSize,current} = pagination
        
        try {
            let response = await fetch('http://oayj.yong-gang.cn:8080/innovate-api/v1/mail/message?'+'account=033216&folder='+folder+'&page='+current+'&rows='+pageSize+'&searchValue=',{
            method:'GET',
            headers:{
                'X-Innovate-Rsbm':'4CEE735A-E182-4D8A-85C8-90B3774AFF2F',
                'X-Innovate-Application':'OA'
            }
        })

        let json = await response.json()

        if(json.code == '0000')
        {
            let data = json.result.mails

            dispatch(createAction(EmailTypes.EMAIL_LIST_FETCH_SUCCESS)({data:data,pagination:pagination}))
        }
        else
        {
            let msg = json.message

            dispatch(createAction(EmailTypes.EMAIL_LIST_FETCH_ERROR)({message:msg,code:json.code}))
        }
        console.log(json)
        } catch (error) {
            dispatch(createAction(EmailTypes.EMAIL_LIST_FETCH_ERROR)(error))
            console.error(error)
        }
    } 
}

export function rowClick(record,folder){
    return dispatch=>{
        
        const {id} = record

        dispatch(push(`/App/EmailList/${folder}/EmailInfo`,{id,folder}))
    }
}
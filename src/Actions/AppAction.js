import { createAction } from "redux-actions";
import { push } from 'connected-react-router'
import * as AppType from "../Contants/AppType";

export function handleMenuClick(item){
    return dispatch=>{

        const {key} = item
        
        if(key == '1')
        {
            dispatch(push('/ygoa/App/Main'))
        }
        else if(key == '2')
        {
            dispatch(push('/ygoa/App/Contact'))
        }
        else if(key == '3')
        {
            dispatch(push('/ygoa/App/EmailList/INBOX'))
        }
        else if(key == '4')
        {
            dispatch(push('/'))
            dispatch(createAction(AppType.LOGIN_OUT)())
        }
    }
}

export function onSliderMenuClick(item){
    return dispatch=>{
        const {key} = item

        switch (key) {
            case '1':
                dispatch(push('/ygoa/App/EmailList/INBOX'))
                break;
            case '2':
                dispatch(push('/ygoa/App/EmailList/Sent'))
                break;
            case '3':
                dispatch(push('/ygoa/App/EmailList/Drafts'))
                break;
            case '4':
                dispatch(push('/ygoa/App/EmailList/Trash'))
                break;
            case '5':
                
                break;
            case '6':
                break;
            default:
                break;
        }
    }
}

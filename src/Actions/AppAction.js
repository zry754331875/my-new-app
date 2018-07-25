import { createAction } from "redux-actions";
import { push } from 'connected-react-router'

export function handleMenuClick(item){
    return dispatch=>{

        const {key} = item
        console.log(item)
        if(key == '1')
        {
            dispatch(push('/Main'))
        }
        else if(key == '2')
        {
            dispatch(push('/Login'))
        }
        else if(key == '3')
        {
            dispatch(push('/EmailList'))
        }
    }
}
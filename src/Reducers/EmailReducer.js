import { handleActions } from "redux-actions";
import * as EmailTypes from "../Contants/EmailTypes";
import { onPageSizeChange } from "../Actions/EmailListActions";

const defaultState = {
    data: [],
    pagination: {
        'pageSize':10,
        'current':1,
        'total':100,
        'showSizeChanger':true,
        'showQuickJumper':true,
        'showTotal':total=>`共${total}条`,
    },
    loading: false,
    Error:null,
}

// function onShowPageSizeChange(current,pageSize){
//     dispatch(onPageSizeChange(current,pageSize))
// }

export default handleActions ({
    [EmailTypes.EMAIL_LIST_FETCH_START]:(state,action)=>{

        return {
            ...state,
            loading:true,
            Error:null,
        }
    },
    [EmailTypes.EMAIL_LIST_FETCH_SUCCESS]:(state,action)=>{
        
        let {data,pagination} = action.payload

        return {
            ...state,
            loading:false,
            data:data,
            pagination:{
                ...state.pagination,
                ...pagination,
            }
        }
    },
    [EmailTypes.EMAIL_LIST_FETCH_ERROR]:(state,action)=>{

        let error = action.payload

        return {
            ...state,
            loading:false,
            Error:error,
        }
    },
    [EmailTypes.EMAIL_LIST_PAGESIZE_CHANGE]:(state,action)=>{
        let pageSize = action.payload

        return {
            ...state,
            pagination:{
                ...state.pagination,
                pageSize:pageSize
            }
        }
    }
},defaultState)
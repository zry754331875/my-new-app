import { handleActions,combineActions } from "redux-actions";
import * as EmailTypes from "../Contants/EmailTypes";


const defaultState = {
    data: [],
    info:null,
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
    emailID:null,
    folder:null,
}

export default handleActions ({
    [combineActions(EmailTypes.EMAIL_LIST_FETCH_START,EmailTypes.EMAIL_INFO_FETCH_START)]:(state,action)=>{

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
    [EmailTypes.EMAIL_INFO_FETCH_SUCCESS]:(state,action)=>{

        let data = action.payload

        return {
            ...state,
            info:data,
            loading:false,
        }
    },
    [combineActions(EmailTypes.EMAIL_LIST_FETCH_ERROR,EmailTypes.EMAIL_INFO_FETCH_ERROR)]:(state,action)=>{

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
    },
    [EmailTypes.EMAIL_INFO_CHANGE]:(state,action)=>{

        let {id,folder} = action.payload

        return {
            ...state,
            emailID:id,
            folder:folder,
        }
    }
},defaultState)
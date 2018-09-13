import { takeEvery,put,take } from "redux-saga/effects";
import {EMAIL_INFO_FETCH_START} from "../Contants/EmailTypes";
import { createAction } from "redux-actions";

function* fetchEmailList(action){
    console.log('1231231')
    
    // yield put(createAction(EmailTypes.EMAIL_LIST_FETCH_SUCCESS)())
}

export default function* fetchEmailListSaga(){
    yield takeEvery('EMAIL_INFO_FETCH_START',fetchEmailList)
}
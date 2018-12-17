import {
  takeEvery,
  put,
  take,
  call,
  fork,
  race,
  all,
  select
} from "redux-saga/effects";
import * as EmailTypes from "../Contants/EmailTypes";
import { createAction } from "redux-actions";
import { push } from "connected-react-router";

export function* fetchEmailList(action) {
  try {
  
    let { folder, pagination } = action.payload;

    let { pageSize, current } = pagination;

    let response = yield call(
      fetch,
      "http://oayj.yong-gang.cn:8080/innovate-api/v1/mail/message?" +
        "account=033216&folder=" +
        folder +
        "&page=" +
        current +
        "&rows=" +
        pageSize +
        "&searchValue=",
      {
        method: "GET",
        headers: {
          "X-Innovate-Rsbm": "4CEE735A-E182-4D8A-85C8-90B3774AFF2F",
          "X-Innovate-Application": "OA"
        },
        credentials: "include"
      }
    );

    let json = yield call([response, response.json]);

    if (json.code === "0000") {
      let data = json.result.mails;

      yield put(
        createAction(EmailTypes.EMAIL_LIST_FETCH_SUCCESS)({
          data: data,
          pagination: pagination
        })
      );
    } else {
      let msg = json.message;

      yield put(
        createAction(EmailTypes.EMAIL_LIST_FETCH_ERROR)({
          message: msg,
          code: json.code
        })
      );
    }
  } catch (error) {
    console.log(error);
    yield put(createAction(EmailTypes.EMAIL_LIST_FETCH_ERROR)(error));
  }
}

export default function *rootSaga(){
  yield all([fork(fetchEmailListSaga)])
}

export function* fetchEmailListSaga() {
  yield takeEvery(EmailTypes.EMAIL_LIST_ROW_CLICK, rowClick);
  yield takeEvery(EmailTypes.EMAIL_LIST_FETCH_START, fetchEmailList);
}

export function* rowClick(action) {
  const { record, folder } = action.payload;

  const { id } = record;

  yield put(push(`/App/EmailList/${folder}/EmailInfo`));

  yield put(createAction(EmailTypes.EMAIL_INFO_CHANGE)({ id, folder }));
}

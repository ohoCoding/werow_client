import { call, put } from 'react-saga/effects';
import { startLoading, finishLoading } from '../../modules/loading';

export default function createRequestSaga( type, request ) {
  const SUCESS = `${type}_SUCESS`;
  const FAILURE =`${type}_FAILURE`;

  return function*(action) {
    yield put(startLoading(type)); //로딩 시작
    try{
      const response = yield call(request, action.payload); //call: 특정함수를 호출하고 결과물 반환
      yield put({  //put함수를 사용해 새로운 액션을 스토어에 전달
        type: SUCESS,
        payload: response.data,
      });
    }catch(e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  }
}
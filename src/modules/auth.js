import {createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga,{
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

//액션이름 정의
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// const REGISTER = 'auth/REGISTER';
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
// const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// 액션 객체를 만드는 액션 생성함수 작성
// export const sampleAction = createAction(SAMPLE_ACTION);
const [REGISTER, REGISTER_SUCCESS, REGISTER_FRAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FRAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({form, key, value}) => ({
    form, //register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); //register login

export const register = createAction(REGISTER, ({ username, password}) => ({
  username,
  password,
}));

export const login = createAction(LOGIN, ({ username, password}) => ({
  username,
  password,
}));

//Saga 생성 
const registerSaga = createRequestSaga(REGISTER, authAPI, register);
const loginSaga = createRequestSaga(LOGIN, authAPI, login);

export function* authSaga() {
  yield takeLatest(REGISTER,registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// reducer 함수가 맨 처음 호출될 때는 state 값이 undefined 
// 값이 undefined로 주어졌을 때는 initialState을 기본값으로 설정하기 위해 
// 함수 파라미터 쪽에 기본값 설정 
const initialState = {
  register:{
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
   auth: null,
   authError: null,
};

const auth = handleActions(
  {
    // [SAMPLE_ACTION]: (state, action ) => state,
       [CHANGE_FIELD] : ( state, {payload: {form, key, value}}) => 
        produce(state, draft => {
          draft[form][key] = value; //state.register.username을 바꾼다
        }),
       [INITIALIZE_FORM]: (state, {payload: form}) => ({
         ...state,
         [form] : initialState[form],
       }),
       //회원가입 성공 
       [REGISTER_SUCCESS] : ( state, { payload: auth}) => ({
         ...state,
         authError:null,
         auth,
       }),
       //회원가입 실패
       [REGISTER_FRAILURE] : ( state, { payload: error}) => ({
         ...state,
         authError: error,
       }),
       //로그인 성공
       [LOGIN_SUCCESS] : ( state, {payload: auth}) => ({
         ...state,
         authError: null,
         auth,
       }),
       //로그인 실패 
       [LOGIN_FRAILURE] : (state, {payload:error}) => ({
         ...state,
         authError: error,
       }),
  },
  initialState,
);

export default auth;


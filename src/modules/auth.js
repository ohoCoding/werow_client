import {createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//액션이름 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// 액션 객체를 만드는 액션 생성함수 작성
// export const sampleAction = createAction(SAMPLE_ACTION);

export const changeField = createAction(
  CHANGE_FIELD,
  ({form, key, value}) => ({
    form, //register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(
  INITIALIZE_FORM, 
  form => form); //register login


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
  },
  initialState,
);

export default auth;


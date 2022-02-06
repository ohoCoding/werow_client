import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from '../../shared/Cookie';
import  config  from '../../config';
import { User, UserInfo } from '../../type';

const Authorization = 'Authorization';

// 액션
const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

// 액션 생성 함수
const getUser = createAction(GET_USER, (user: User) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const updateUser = createAction(UPDATE_USER, (user: User) => ({ user }));
const deleteUser = createAction(DELETE_USER, () => ({}));

const inititalState: UserInfo = {
    user: null,
    isLogin: false,
};

// 회원 탈퇴
// 유저 id를 전송해 DB에 회원 정보를 삭제
const deleteUserDB = () => {
    return function (dispatch: any, getState: any, { history }: any) {
        axios({
            method: 'delete',
            url: `${config.api}/api/user`,
        })
            .then(() => {
                dispatch(deleteUser());
                window.alert('회원탈퇴가 완료되었습니다..😭');
                // replace를 사용한 이유: 뒤로가기 했을때 회원 정보 수정창이 나오면 비로그인 시 접근 차단은 했지만 사용자 경험이 별로이므로
                history.replace('/');
            })
            .catch((e) => {
                console.log('에러발생', e);
            });
    };
};

// 회원정보 조회
const getUserDB = () => {
    return function (dispatch: any) {
        // 토큰 값 조회
        const jwtToken = getCookie('is_login');
        // 새로고침 하면 헤더 default 날라가므로 다시 헤더에 토큰을 담아줌
        axios.defaults.headers.common[Authorization] = `Bearer ${jwtToken}`;
        axios({
            method: 'get',
            url: `${config.api}/api/users/token`,
        })
            .then((res) => {
                // 받은 유저 정보 저장
                dispatch(
                    getUser({
                        nickname: res.data.nickname,
                        email: res.data.email,
                        photo: res.data.photo,
                        id: res.data.id,
                        isFreelancer: res.data.isFreelancer,
                        provider: res.data.provider,
                        role: res.data.role,
                    }),
                );
            })
            .catch((e) => {
                console.log('에러발생', e);
            });
    };
};

// 회원 정보 수정
// 변경할 데이터를 서버에 보내줌
const updateUserDB = (password: string, email: string, phone: string) => {
    return function (dispatch: any, getState: any, { history }: any) {
        axios({
            method: 'put',
            url: `${config.api}/api/user`,
            data: {
                password,
                email,
                phone,
            },
        })
            .then((res) => {
                // 스토어에서도 최신 데이터로 변경
                dispatch(
                    updateUser({
                        nickname: res.data.nickname,
                        email: res.data.email,
                        photo: res.data.photo,
                        id: res.data.id,
                        isFreelancer: res.data.isFreelancer,
                        provider: res.data.provider,
                        role: res.data.role,
                    }),
                );
                window.alert('회원정보가 변경되었습니다!');
                history.replace('/');
            })
            .catch((e) => {
                console.log('에러발생', e);
            });
    };
};

// 로그인
const LoginDB = (getemail: string, getpassword: string) => {
    return function (dispatch: any, getState: any, { history }: any) {
        axios({
            method: 'post',
            url: `${config.api}/api/login/email`,
            data: {
                email: getemail,
                password: getpassword,
            },
        })
            .then((res) => {
                console.log(res.data.accessToken);
                console.log(res.data.refreshToken);
                const {refreshToken,accessToken} = res.data;
                // 받은 토큰을 쿠키에 저장
                setCookie('is_login_accessToken', accessToken);
                setCookie('is_login_refreshToken', refreshToken);
                // 통신 시 헤더에 default로 저장
                // axios.defaults.headers.common[Authorization] = `Bearer ${jwtToken}`;
                // 로그인 후 회원 정보를 스토어에 최신화
                dispatch(getUserDB());
                history.push('/');
            })
            .catch((e) => {
                window.alert(e.response.data);
                console.log('에러발생:', e);
            });
    };
};
// 카카오 로그인
const Kakao = (getcode: any) => {
    return function ({ history }: any): void {
        axios.get(`https://0giri.com/api/oauth2/kakao?code=${getcode}`)
        .then((response) => {
            const responsedata = response.data
            console.log(responsedata);
            history.push('/');
        })
        .catch((e) => {
            window.alert(e.response.data);
            console.log('에러 발생:', e);
        });
    };
};
// 회원가입
const SignupDB = (data: any) => {
    console.log(data.userEmail);
    return function (dispatch: any, getState: any, { history }: any): void {
        // 회원 가입 시 작성한 유저 정보를 서버에 보내줌
        axios.post(`https://0giri.com/api/users`,
            {
                email: data.userEmail,
                nickname: data.nickname,
                password: data.password,
                photo: data.photo,
                provider: data.provider,
            },
        )
            .then((response) => {
                console.log(response);
                // 전송 후 로그인 페이지로 이동
                history.push('/user/login');
            })
            .catch((e) => {
                window.alert(e.response.data);
                console.log('에러 발생:', e);
            });
    };
};

// 리듀서
// redux-actions와 immer를 사용
// user: 유저 정보, is_login: 로그인 상태
// 비슷한 코드라 2개에 액션으로 처리해도 되지만 logger에서 액션 타입만 보고 이해할 수 있게 나눔
export default handleActions(
    {
        [GET_USER]: (state, action) =>
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.isLogin = true;
            }),
        [LOG_OUT]: (state) =>
            produce(state, (draft) => {
                // 로그 아웃 시 쿠키에 담긴 토큰 삭제, 회원정보 비워줌, 로그인 여부 false
                deleteCookie('is_login');
                draft.user = null;
                draft.isLogin = false;
            }),
        [UPDATE_USER]: (state, action) =>
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.isLogin = true;
            }),
        [DELETE_USER]: (state) =>
            produce(state, (draft) => {
                // 회원 탈퇴 시 쿠키에 담긴 토큰 삭제, 회원정보 비워줌, 로그인 여부 false
                deleteCookie('is_login');
                draft.user = null;
                draft.isLogin = false;
            }),
    },
    inititalState,
);

const actionCreators = {
    Kakao,
    SignupDB,
    LoginDB,
    getUserDB,
    logOut,
    deleteUserDB,
    updateUserDB,
};

export { actionCreators };

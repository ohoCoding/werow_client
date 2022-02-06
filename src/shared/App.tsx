import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { getCookie } from '../shared/Cookie';
import { actionCreators as userActions } from '../redux/modules/user';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Main from '../pages/Main';
import OAuth from "./OAuth";

function App() {
    const dispatch = useDispatch();
    const cookie = getCookie('is_login') ? true : false;
    // 쿠키 존재할때 리렌더링 시 회원정보 조회
    useEffect(() => {
        if (cookie) {
            dispatch(userActions.getUserDB());
        }
    }, []);
    return (
        <>
            <ConnectedRouter history={history}>
                <Route path="/" exact component={Main} />
                <Route path="/user/signup" exact component={Signup} />
                <Route path="/user/login" exact component={Login} />
                <Route path="/oauth2/kakao" exact component={OAuth} />
            </ConnectedRouter>
        </>
    );
}

export default App;

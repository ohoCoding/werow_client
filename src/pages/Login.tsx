import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actionCreators as userActions } from '../redux/modules/user';
// 로그인 페이지
function Login(props: { history: any }) {
    const CLIENT_ID = "b49d403eab459f2dcb5d7b635c14139b";
    const REDIRECT_URI = "https://0giri.com/oauth2/kakao";
    // const REDIRECT_URI = "http://localhost:3000/api/oauth2/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const { history } = props;
    const dispatch = useDispatch();
    const [email, SetEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const login = () => {
        if (email === '' || password === '') {
            window.alert('로그인 정보를 모두 입력해주세요.');
            return;
        }
        dispatch(userActions.LoginDB(email, password));
    };
    return (
        <Container>
            <Header>
                <HeaderImg src="" alt="WEROW" />
            </Header>
            <MainContainer>
                <TitleBox>
                    <Title>통합ID 로그인</Title>
                </TitleBox>
                <InputBox>
                    <Input
                        type="text"
                        placeholder="이메일"
                        onChange={(e) => {
                            SetEmail(e.target.value);
                        }}
                    />
                </InputBox>
                <InputBox>
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </InputBox>
                <FindId>
                    <span>
                        이메일/비밀번호 찾기{' '}
                        <img src="https://auth.dano.me/res/images/ec1e39bf2b6a3857a9e6bd2c3364a67f.png" alt="화살표" />
                    </span>
                </FindId>
                <div>
                    <LoginBtn onClick={login}>로그인</LoginBtn>
                    <SignupBtn
                        onClick={() => {
                            history.push('/user/signup');
                        }}
                    >
                        회원가입
                    </SignupBtn>
                </div>
                <SnsBox>
                    <SnsText>SNS로 시작하기</SnsText>
                    <SnsBtnBox>
                        <h1><a href={KAKAO_AUTH_URL}>
                            <img src="../img/kakao_login.png" id="kakao-login-btn" width="200px" alt='카카오로그인' />
                            </a></h1>
                        {/* <KakaoBtn {...KAKAO_AUTH_URL}>
                            <img
                                src="https://auth.dano.me/res/images/49c343639ceea64b1fe7f46e2d6442ef.svg"
                                alt="카톡"
                            />
                            카카오톡
                        </KakaoBtn> */}

                        <AppleBtn
                            onClick={() => {
                                history.push('/prepare');
                            }}
                        >
                            <img
                                src="https://blog.kakaocdn.net/dn/czMTX6/btqNbvGUwIu/xxqSeZd4eRMvTHqbfIZUd0/img.png"
                                alt="네이버"
                            />
                            NAVER
                        </AppleBtn>
                    </SnsBtnBox>
                </SnsBox>
            </MainContainer>
        </Container>
    );
}

const Container = styled.div`
    margin: auto;
    min-width: 290px;
    max-width: 460px;
    position: relative;
`;

const Header = styled.div`
    height: 42px;
    line-height: 42px;
    background: #fff;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: #0d0d0d;
    border-bottom: 1px solid #ebebeb;
`;

const HeaderImg = styled.img`
    font-size: 18px;
    height: 16px;
`;
const MainContainer = styled.div`
    margin: auto 40px;
`;

const TitleBox = styled.div`
    margin-top: 55px;
`;
const Title = styled.div`
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    color: #0d0d0d;
    margin-bottom: 5px;
`;
const InputBox = styled.div`
    margin-top: 15px;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    text-align: left;
    font-size: 13px;
    color: #2c2c2c;
    padding: 0 15px;
    height: 45px;
    box-sizing: border-box;
`;

const FindId = styled.div`
    text-align: right;
    margin: 12px 0;
    font-size: 13px;
    & span {
        color: #b0b0b0;
        text-decoration: underline;
        margin: 0;
        padding: 0;
        cursor: pointer;
        & img {
            width: 7px;
            margin-left: 5px;
        }
    }
`;
const LoginBtn = styled.button`
    width: 100%;
    height: 45px;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #e7e7e7;
    background-color: #fbfbfb;
    color: #ff6f61;
    cursor: pointer;
`;
const SignupBtn = styled.button`
    margin-top: 10px;
    color: #fff;
    background-color: #ff6f61;
    width: 100%;
    height: 45px;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #e7e7e7;
    cursor: pointer;
`;

const SnsBox = styled.div`
    padding-top: 40px;
`;
const SnsText = styled.div`
    color: rgb(59, 59, 59);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
    line-height: 14px;
`;
const SnsBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const KakaoBtn = styled.button`
    height: 50px;
    width: 47%;
    border-radius: 27.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    background-color: rgb(254, 229, 0);
    border: 0;
    cursor: pointer;
    & img {
        width: 22px;
        margin-right: 12px;
    }
`;
const AppleBtn = styled.button`
    height: 50px;
    width: 47%;
    border-radius: 27.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: rgb(45, 180, 0);
    border: 1px solid rgb(218, 218, 218);
    cursor: pointer;
    & img {
        width: 22px;
        margin-right: 12px;
    }
`;

export default Login;

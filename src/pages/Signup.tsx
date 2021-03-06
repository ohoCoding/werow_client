import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation} from 'react-router';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck, idCheck, nicknameCheck } from '../shared/common';
import { history, RootState } from '../redux/configureStore';
import { UserInfo } from '../type';

type userInfo = {
    email: string,
    id: string,
    isMember: boolean,
    photo: string,
    provider: string
}
function Signup() {
    const dispatch = useDispatch();
    const [provider, setProvider] = useState<string>('EMAIL')
    const [nickname, SetNickname] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [photo, setPhoto] = useState<string>('');
    const [fileUrl, setFileUrl] = useState<string>('');
    const [data,setData] = useState({});
    const CLIENT_ID = "b49d403eab459f2dcb5d7b635c14139b";
    // const REDIRECT_URI = "https://0giri.com/oauth2/kakao";
    const REDIRECT_URI = "http://localhost:3000/oauth2/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const location:any = useLocation();
    const info = location.state;
    const [user,setUser] = useState<userInfo>({
        email: '',
        id: '',
        isMember: false,
        photo: '',
        provider: 'EMAIL'
    });

    const signup = (): void => {
        // 유효성 검증
        if (
            nickname === '' ||
            password === '' ||
            passwordCheck === '' ||
            // userName === '' ||
            userEmail === ''
            // phoneNum === '' ||
            // photo === ''
        ) {
            window.alert('회원 정보를 모두 입력하세요.');
            return;
        }
        if (password !== passwordCheck) {
            window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        if (password.length < 4 || password.length > 16 || passwordCheck.length < 4 || passwordCheck.length > 16) {
            window.alert('비밀번호는 형식이 맞지 않습니다.');
            return;
        }
        if (!nicknameCheck(nickname) || nickname.length < 4 || nickname.length > 16) {
            window.alert('닉네임 형식이 맞지 않습니다.');
            return;
        }
        if (!emailCheck(userEmail)) {
            window.alert('이메일 형식이 맞지 않습니다.');
            return;
        }
        // if (!phoneNumCheck(phoneNum)) {
        //     window.alert('핸드폰 형식이 맞지 않습니다.');
        //     return;
        // }
            const data = {userEmail, nickname, password, provider, photo}
        dispatch(userActions.SignupDB(data));
    };
    useEffect(() => {
        if(info){
            setUserEmail(info.email)
            setProvider(info.provider)
            setPhoto(info.photo)
        }
        console.log(photo);


    },[photo])
    const handleFileOnChange = (event : any) => {

        const file = event.target.files[0];
        console.log(typeof file);

        const imageUrl = URL.createObjectURL(file);
        setFileUrl(imageUrl);
        // setPhoto(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // reader.onloadend = () => resolve(reader.result);
        // reader.onloadend = () => {
        //     // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        //     const base64 = reader.result;
        //     if (base64) {
        //       setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
        //     }
        //   }
        //   if (file) {
        //     console.log(file);

        //     reader.readAsDataURL(file); // 1. 파일을 읽어 버퍼에 저장합니다.
        //     setPhoto(file); // 파일 상태 업데이트
        //   }
        reader.onloadend = () => {
          setPreviewURL(reader.result);
        }
        if(file)
          reader.readAsDataURL(file);
          setPhoto(file);
      }

    return (
        <>
            <Container>
                <Header>
                    <HeaderImg src="" alt="WEROW" onClick={() => history.push('/')}/>
                </Header>
                <MainContainer>
                    <TitleBox>
                        <Title>회원 가입</Title>
                    </TitleBox>
                    <SignupTitleBox>
                        <SignupTitle>기본 정보 입력</SignupTitle>
                    </SignupTitleBox>
                    <SignupBox>
                        <table>
                            <tbody>
                                <tr>
                                    <th>닉네임</th>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="한글 4~16자"
                                            onChange={(e) => {
                                                SetNickname(e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr>
                                  <tr>
                                    <th>이메일</th>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="abc@email.com"
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                            }}
                                            defaultValue={info?.email}
                                            disabled={info}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호</th>
                                    <td>
                                        <input
                                            type="password"
                                            placeholder="영문, 숫자, 특수문자 4~16자 이내"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호 확인</th>
                                    <td>
                                        <input
                                            type="password"
                                            onChange={(e) => {
                                                setPasswordCheck(e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <th>이름</th>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="성과 이름을 모두 입력하세요."
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr> */}
                                {/* <tr>
                                    <th>이메일</th>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="abc@email.com"
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                            }}
                                        />
                                    </td>
                                </tr> */}
                                <tr>
                                    <th hidden={!info}>프로필 사진</th>
                                    <td>
                                        {info? null: <input type="file" name="photo" id="photo" hidden
                                        onChange={handleFileOnChange}></input> }
                                        {info? <img src={info.photo} alt='' height='200' width='200'></img>
                                        : <img src={fileUrl} alt='' hidden height='200' width='200'></img>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </SignupBox>
                    <div>
                        <SignupBtn onClick={signup}>통합 회원가입</SignupBtn>
                    </div>
                    <SnsBtnBox>
                    <h1>
                        <a href={KAKAO_AUTH_URL}>
                            <img src="../img/kakao_login.png"
                            id="kakao-login-btn" width="180px" alt='카카오로그인' />
                        </a>
                    </h1>
                    <h1>
                            <img
                                src="../img/naver_login.png"
                                id="naver-login-btn" width="180px" alt='네이버로그인'
                            />
                    </h1>
                    </SnsBtnBox>

                </MainContainer>
            </Container>
        </>
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
const SignupTitleBox = styled.div`
    margin-top: 30px;
`;
const SignupTitle = styled.div`
    color: #000;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #000;
`;

const SignupBox = styled.div`
    padding: 15px 20px 20px;
    & table {
        border-spacing: 0;
        border: 0;
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        & tbody {
            margin: 0;
            padding: 0;
            & th {
                height: 15px;
                font-size: 13px;
                text-align: left;
                color: #2c2c2c;
                width: 30%;
                vertical-align: initial;
                line-height: 44px;
            }
            & td {
                padding-bottom: 5px;
                & input {
                    width: 100%;
                    height: 44px;
                    font-size: 13px;
                    color: #2c2c2c;
                    margin-bottom: 10px;
                    border-radius: 2px;
                    border: 0.7px solid #dadada;
                    padding: 14px;
                    box-sizing: border-box;
                }
            }
        }
    }
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

const SnsBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
export default Signup;
function setPreviewURL(result: string | ArrayBuffer | null) {
    throw new Error('Function not implemented.');
}


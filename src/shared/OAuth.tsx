import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';

function OAuth() {
    const REST_API_KEY = "b49d403eab459f2dcb5d7b635c14139b";
    const REDIRECT_URI = "http://localhost:3000/api/oauth2/kakao";
    const CLIENT_SECRET = "M0O7ChJbg37xqLKXGhcNQqO68bsqJwt5";

    // calllback으로 받은 인가코드
    const getcode = new URL(window.location.href).searchParams.get("code");

    const history = useHistory();

    const getToken = async () => {
        return function() {
            axios.post(`https://0giri.com/api/oauth2/kakao`,
            {
                code: getcode
            }
        )
        .then((response) => {
            console.log(response);

        })
        .catch((e) => {
            window.alert(e.response.data);
            console.log('에러 발생:', e);
        });
    };
        // const payload = qs.stringify({
        //   grant_type: "authorization_code",
        //   client_id: REST_API_KEY,
        //   redirect_uri: REDIRECT_URI,
        //   code: code,
        //   client_secret: CLIENT_SECRET,
        // });
        // try {
        //     // access token 가져오기
        //     const res = await axios.post(
        //       "https://kauth.kakao.com/oauth/token",
        //       payload
        //     );


        //     // access token 설정
        //     window.Kakao.Auth.setAccessToken(res.data.access_token);
        //     history.replace("/profile");
        //   } catch (err) {
        //     console.log(err);
        //   }
};
        useEffect(() => {
          getToken();
        }, []);
    return null;
};
export default OAuth;
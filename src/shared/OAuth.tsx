import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

function OAuth() {

    // calllback으로 받은 인가코드
    const getcode = new URL(window.location.href).searchParams.get("code");

    const dispatch = useDispatch();

    useEffect(() => {
            console.log(getcode);
            dispatch(userActions.Kakao(getcode));
    }, []);

    return null
};
export default OAuth;
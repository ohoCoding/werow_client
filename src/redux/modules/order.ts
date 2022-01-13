import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import axios from 'axios';
import  config  from '../../config';
import { ProductItem } from '../../type';
import { getCookie } from '../../shared/Cookie';

// 액션
const GET_ORDER = 'GET_ORDER';

// 액션생성함수
const getOrder = createAction(GET_ORDER, (list: ProductItem[]) => ({ list }));

// 초기 state
const initialState: { list: ProductItem[] } = {
    list: [],
};

// 미들웨어
// 구매 내역 조회
// 유저가 장바구니나 디테일페이지에서 구매버튼을 클릭한 데이터를 전부 조회
const getOrderDB = () => {
    return function (dispatch: any) {
        if (!getCookie('is_login')) {
            dispatch(getOrder([]));
            return;
        }
        axios({
            method: 'get',
            url: `${config.api}/api/order`,
        })
            .then((res) => {
                const orderList: ProductItem[] = [...res.data];
                dispatch(getOrder(orderList));
            })
            .catch((e) => {
                console.log('에러발생:', e);
            });
    };
};

// 제품 구매하기
// 디테일페이지에서 제품 구매하기 버튼을 클릭시 구매내역에 추가
// 보내는 데이터: 갯수, 제품id
const addOrderDB = (orderItem: { productId: number | undefined; amount: number }) => {
    return function (_dispatch: any, _getState: any, { history }: any) {
        axios({
            method: 'post',
            url: `${config.api}/api/order`,
            data: {
                amount: orderItem.amount,
                productId: orderItem.productId,
            },
        })
            .then(() => {
                window.alert('구매가 완료되었습니다 :)');
                history.push('/purchase');
            })
            .catch((e) => {
                window.alert('상품 구매에 실패했습니다. 😭');
                console.log('에러발생', e);
            });
    };
};

// 리듀서
// redux-actions와 immer를 사용
export default handleActions(
    {
        [GET_ORDER]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.list;
            }),
    },
    initialState,
);

const actionCreators = {
    addOrderDB,
    getOrderDB,
};

export { actionCreators };

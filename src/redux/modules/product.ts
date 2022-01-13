import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import  config  from '../../config';
import { ProductInfo, ProductItem } from '../../type';

// 액션
const GET_ITEMS = 'GET_ITEMS';
const GET_BEST_ITEMS = 'GET_BEST_ITEMS';
const GET_NEW_ITEMS = 'GET_NEW_ITEMS';
const GET_DANO_ITEMS = 'GET_DANO_ITEMS';
const GET_THRIFTY_ITEMS = 'GET_THRIFTY_ITEMS';
const GET_FREE_ITEMS = 'GET_FREE_ITEMS';
const LOADING = 'LOADING';

// 액션 생성함수
const getItems = createAction(GET_ITEMS, (list: ProductItem[]) => ({ list }));
const bestItems = createAction(GET_BEST_ITEMS, (list: ProductItem[]) => ({ list }));
const newItems = createAction(GET_NEW_ITEMS, (list: ProductItem[]) => ({ list }));
const thriftyItems = createAction(GET_THRIFTY_ITEMS, (list: ProductItem[]) => ({ list }));
const freeitems = createAction(GET_FREE_ITEMS, (list: ProductItem[]) => ({ list }));
const loading = createAction(LOADING, (isLoading: boolean) => ({ isLoading }));

// 초기 state값
const initialState: ProductInfo = {
    list: [],
    bestList: [],
    newList: [],
    danoList: [],
    thriftyList: [],
    freeList: [],
    isLoading: false,
};
// 미들웨어

// 크롤링한 상품 조회
// 메인페이지 및 카테고리별 페이지에서 조회
const getItemDB = () => {
    return function (dispatch: any) {
        // 데이터 로딩시 스피너를 보여주기 위한 처리
        dispatch(loading(true));
        axios({
            method: 'get',
            url: `${config.api}/api/product/all`,
        })
            .then((res) => {
                const itemList = [...res.data];
                dispatch(getItems(itemList));
            })
            .catch((e) => console.log(e));
    };
};

// 디테일 페이지 상품 조회(리렌더링시 에러 방지)
const getItemOneDB = (id: string) => {
    return function (dispatch: any) {
        axios({
            method: 'get',
            url: `${config.api}/api/product/all`,
        })
            .then((res) => {
                // 전체 리스트 중 특정 제품 하나 필터처리
                const item = res.data.filter((val: ProductItem) => {
                    return val.productId === parseInt(id);
                });
                dispatch(getItems(item));
            })
            .catch((e) => console.log(e));
    };
};

// 인기 상품 조회
const getBestDB = () => {
    return function (dispatch: any) {
        // 데이터 로딩시 스피너를 보여주기 위한 처리
        dispatch(loading(true));
        axios({
            method: 'get',
            url: `${config.api}/api/product/best`,
        })
            .then((res) => {
                const itemList = [...res.data];
                dispatch(bestItems(itemList));
            })
            .catch((e) => console.log(e));
    };
};

// 신상품 조회
const getNewDB = () => {
    return function (dispatch: any) {
        dispatch(loading(true));
        axios({
            method: 'get',
            url: `${config.api}/api/product/new`,
        })
            .then((res) => {
                const itemList = [...res.data];
                dispatch(newItems(itemList));
            })
            .catch((e) => console.log(e));
    };
};
// 다노상품 조회
const getDanoDB = () => {
    return function (dispatch: any) {
        dispatch(loading(false));
        // axios({
        //     method: 'get',
        //     url: `${config.api}/api/product/dano`,
        // })
        //     .then((res) => {
        //         const itemList = [...res.data];
        //         dispatch(danoItems(itemList));
        //     })
        //     .catch((e) => console.log(e));
    };
};
// 알뜰상품 조회
const getThriftyDB = () => {
    return function (dispatch: any) {
        dispatch(loading(true));
        axios({
            method: 'get',
            url: `${config.api}/api/product/thrifty`,
        })
            .then((res) => {
                const itemList = [...res.data];
                dispatch(thriftyItems(itemList));
            })
            .catch((e) => console.log(e));
    };
};

// 무료배송 상품 조회
const getfreeDB = () => {
    return function (dispatch: any) {
        dispatch(loading(true));
        axios({
            method: 'get',
            url: `${config.api}/api/product/free`,
        })
            .then((res) => {
                const itemList = [...res.data];
                dispatch(freeitems(itemList));
            })
            .catch((e) => console.log(e));
    };
};

// 리듀서
// redux-actions와 immer를 사용
export default handleActions(
    {
        [GET_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [GET_BEST_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.bestList = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [GET_NEW_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.newList = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [GET_DANO_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.danoList = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [GET_THRIFTY_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.thriftyList = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [GET_FREE_ITEMS]: (state, action) =>
            produce(state, (draft) => {
                draft.freeList = action.payload.list;
                // 통신이 완료되면 스피너 대신 리스트 보기 위해 loading: false
                draft.isLoading = false;
            }),
        [LOADING]: (state, action) =>
            produce(state, (draft) => {
                draft.isLoading = action.payload.isLoading;
            }),
    },
    initialState,
);

const actionCreators = {
    getItemDB,
    getItemOneDB,
    getBestDB,
    getDanoDB,
    getNewDB,
    getThriftyDB,
    getfreeDB,
};

export { actionCreators };

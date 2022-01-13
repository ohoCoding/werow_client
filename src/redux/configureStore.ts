import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import user from './modules/user';
import product from './modules/product';
import order from './modules/order';
import cart from './modules/cart';

export const history = createBrowserHistory();
// 리듀서 합치기
const rootReducer = combineReducers({
  cart,
  order,
  product,
  user,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [thunk.withExtraArgument({ history })];

const env = process.env.NODE_ENV;
if (env === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 생성

const store = createStore(rootReducer, enhancer);

export default store;

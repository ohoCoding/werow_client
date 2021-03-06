import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import axios from 'axios';
import { getCookie } from './shared/Cookie';
import App from './shared/App';
import store from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

// axios.interceptors.request.use((config) => {
//     const token = getCookie('is_login_accessToken');
//     config.headers.Authorization = `Bearer ${token}`;

//     return config;
// });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './redux/Store';
import { Provider } from 'react-redux'
import Main from './Main';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Main/>
    </Provider>
);
// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Note from '../src/Components/Note'
import { store } from './redux/Store';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Note />
    </Provider>
);
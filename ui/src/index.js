import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Provider, useDispatch} from "react-redux";
//import appRedux from "./modules/appRedux";
import 'bootstrap/dist/css/bootstrap.min.css'
import reducer from "./modules/appRedux";

const handleAsync = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)
    next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    // combineReducers({appRedux}),
    composeEnhancers(applyMiddleware(handleAsync))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

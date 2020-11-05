import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';



import App from './components/App';

//Development only axios helpers!
import axios from 'axios';
window.axios = axios;

const store = createStore( reducers, {}, applyMiddleware(reduxThunk) ) // reducers, state, applyMiddleware()

ReactDom.render(
<Provider store={store}> <App /> </Provider>,
 document.querySelector('#root')
 );

 
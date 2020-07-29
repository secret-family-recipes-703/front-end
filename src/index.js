import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux";
import {recipesReducer} from './reducers'
import App from './App';
import thunk from "redux-thunk"
import './fonts/porter-sans-inline-block.ttf'
import './fonts/PrincessSofia-Regular.ttf'
import './fonts/Merienda-Regular.ttf'

const store = createStore(recipesReducer, applyMiddleware(thunk))

const rootElement = document.getElementById('root');
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, 
rootElement);
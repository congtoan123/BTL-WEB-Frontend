import {combineReducers} from 'redux';

import loginReducers from './login';
import BookReducers from './book';
import CommentReducers from './comment'; 
import OrderReducers from './order';
const reducers = combineReducers({
    login: loginReducers,
    book: BookReducers,
    comment : CommentReducers,
    order : OrderReducers,
});

export default (state, action) => reducers(state, action);  
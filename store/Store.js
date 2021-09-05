import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/authReducer';
import { themeReducer } from './reducers/themeReduer';
import { marksReducer } from './reducers/marksReducer';
import { dateReducer } from './reducers/dateReducer';

const rootReducer = combineReducers(
    {
        auth: authReducer, 
        theme: themeReducer, 
        marks: marksReducer,
        date: dateReducer
    }
    );

export const store = createStore(rootReducer);
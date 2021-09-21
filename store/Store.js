import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/authReducer';
import { themeReducer } from './reducers/themeReduer';
import { marksReducer } from './reducers/marksReducer';
import { dateReducer } from './reducers/dateReducer';
import {calendarReducer} from "./reducers/calendarReducer";
import {lessonReducer} from "./reducers/lessonReducer";
import {loadsReducer} from "./reducers/loadsReducer";
import {timetableReducer} from "./reducers/timetableReducer"

const rootReducer = combineReducers(
    {
        auth: authReducer, 
        theme: themeReducer, 
        marks: marksReducer,
        date: dateReducer,
        calendar: calendarReducer,
        lesson: lessonReducer,
        loads: loadsReducer,
        tt: timetableReducer
    });

export const store = createStore(rootReducer);
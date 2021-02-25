import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import eventsReducer from './events';
import sessionReducer from './session';
import groupReducer from './groups'
import userReducer from './user';

<<<<<<< HEAD
const rootReducer = combineReducers({
    session: sessionReducer,
    group: groupReducer,
=======


const rootReducer = combineReducers({
    session: sessionReducer,
    events:eventsReducer,
>>>>>>> main
    user: userReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

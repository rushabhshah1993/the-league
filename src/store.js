import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import tableReducer from './reducers/tableReducers';
import divisionsReducer from './reducers/divisionsReducer';
import fightersReducer from './reducers/fightersReducers';
import roundsReducer from './reducers/roundsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        table: tableReducer,
        divisions: divisionsReducer,
        fighters: fightersReducer,
        rounds: roundsReducer
    }),
    {},
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
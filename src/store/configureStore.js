import { createStore, applyMiddleware } from 'redux';
import thunk          from 'redux-thunk';
import actionReducers from '../../lib/action_reducers';
import initializer    from '../action_reducers';

export default function configureStore(initialState) {
    let { middleware, reducer } = actionReducer(initializer);
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            middleware,
            thunk
        )
    );
}

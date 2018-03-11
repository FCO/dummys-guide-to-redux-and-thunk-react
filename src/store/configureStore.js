import { createStore, applyMiddleware } from 'redux';
import actionReducer  from '../lib/action_reducer';
import initializer    from '../action_reducers';

export default function configureStore(initialState) {
    let { middleware, reducer } = actionReducer(initializer);
    return createStore(
        reducer,
        initialState,
        applyMiddleware(
            middleware
        )
    );
}

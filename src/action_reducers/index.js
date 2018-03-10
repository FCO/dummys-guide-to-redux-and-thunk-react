export default actionReducers => {
    actionReducers.createAction("itemsHasErrored",          hasErrored => ({hasErrored}));
    actionReducers.createAction("itemsIsLoading",           isLoadin   => ({isLoading}));
    actionReducers.createAction("itemsFetchDataSuccess",    items      => ({items}));
    actionReducers.createAction("itemsFetchData",           url        => {
        return async dispatch => {
            dispatch(itemsIsLoading(true));

            let response = await fetch(url)
            if (!response.ok) {
                dispatch(itemsHasErrored(true));
            }

            dispatch(itemsIsLoading(false));

            let items = await response.json();
            dispatch(itemsFetchDataSuccess(items))
        };
    });
    actionReducers.createReducer("itemsHasErrored",       (draft, action) => action.hasErrored);
    actionReducers.createReducer("itemsIsLoading",        (draft, action) => action.isLoading);
    actionReducers.createReducer("itemsFetchDataSuccess", (draft, action) => action.items);
}

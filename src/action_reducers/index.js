export default actionReducers => {
    actionReducers.createAction("itemsHasErrored",          hasErrored => ({hasErrored}));
    actionReducers.createAction("itemsIsLoading",           isLoading  => ({isLoading}));
    actionReducers.createAction("itemsFetchDataSuccess",    items      => ({items}));
    actionReducers.createAction("itemsFetchData",           url        => {
        return async dispatch => {
            dispatch("itemsIsLoading", true);

            let response = await fetch(url)
            if (!response.ok) {
                dispatch("itemsHasErrored", true);
            }

            let items = await response.json();
            dispatch("itemsFetchDataSuccess", items)

            dispatch("itemsIsLoading", false);
        };
    });
    actionReducers.addCombinedReducer("itemsHasErrored",        "hasErrored", action => action.hasErrored);
    actionReducers.addCombinedReducer("itemsIsLoading",         "isLoading",  action => action.isLoading,   false);
    actionReducers.addCombinedReducer("itemsFetchDataSuccess",  "items",      action => action.items,       []);
}

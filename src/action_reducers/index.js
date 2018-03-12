export default actionReducers => {
    actionReducers.createAction("itemsHasErrored",          hasErrored => ({hasErrored}));
    actionReducers.createAction("itemsIsLoading",           isLoading  => ({isLoading}));
    actionReducers.createAction("itemsFetchData",           url        => {
        return async dispatch => {
            dispatch("itemsIsLoading", true);

            let response = await fetch(url)
            if (!response.ok) {
                return dispatch("itemsHasErrored", true);
            }

            let items = await response.json();

            dispatch("itemsIsLoading", false);
            return { items }
        };
    });
    actionReducers.addCombinedReducer("itemsHasErrored", "hasErrored", action => action.hasErrored);
    actionReducers.addCombinedReducer("itemsIsLoading",  "isLoading",  action => action.isLoading,   false);
    actionReducers.addCombinedReducer("itemsFetchData",  "items",      action => action.items,       []);
}

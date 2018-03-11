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
    actionReducers.createReducer("itemsHasErrored",       (draft, action) => {draft.hasErrored = action.hasErrored});
    actionReducers.createReducer("itemsIsLoading",        (draft, action) => {draft.isLoading  = action.isLoading});
    actionReducers.createReducer("itemsFetchDataSuccess", (draft, action) => {draft.items      = action.items});
}

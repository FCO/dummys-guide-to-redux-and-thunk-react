export default function(addActionReducers) {
    let ar = new ActionReducers();
    addActionReducers(ar);
    return () => next => (name, ...data) => {
        if(!(name in ar.actions)) throw `Action '${name}' not found.`;
        let resp = ar.actions[name](...data);
        if(typeof resp == null) return;
        return next(resp)
    }
}

class ActionReducers {
    constructor() {
        this.reducers = {}
        this.actions  = {}
    }
    createReducer(name, reducer) {
        name = transformReducerName(name);
        if(name in this.reducers)           throw `Reducer named '${name}' already exists.`;
        if(typeof reducer != 'function')    throw `Reducer '${name}' is not a function.`
        this.reducers[name] = reducer;
    }
    createAction(name, action = data => Object.assign({}, data)) {
        if(name in this.actions)            throw `Action named '${name}' already exists.`;
        if(typeof action  != 'function')    throw `Action '${name}' is not a function.`
        this.actions[name] = wrapAction(name, action);
    }
    get reducer() {
        return this.runReducer.bind(this)
    }
    runReducer(state, action) {
        if(!(action.type in this.reducers)) return state;
        let draft = clone(state);
        let ret = this.reducers[action.type](draft, action);
        if(typeof ret == null) return draft;
        return ret
    }
}

function wrapAction(name, func) {
    return (...data) => Object.assign({}, {type: transformReducerName(name)}, func(...data))
}

function clone(obj){
    if(obj===null || typeof obj !== "object")
        return obj;

    if(obj instanceof Date)
        return new Date(obj.getTime());

    if(Array.isArray(obj))
        return obj.slice(0);

    let clonedObj = new obj.constructor();
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            clonedObj[prop] = clone(obj[prop]);
        }
    }
    return clonedObj;
}

function transformReducerName(name) {
    return name.toUpperCase()
}

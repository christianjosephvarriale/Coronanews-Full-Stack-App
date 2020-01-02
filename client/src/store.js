import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers';

const initalState = {};
const middleWare = [thunk];

const store = createStore(
    rootReducer,
    initalState,
    compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
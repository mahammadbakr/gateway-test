import combineReducer from "../rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import storage from "./sync_storage";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        // if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return combineReducer(state, action);
    }
};
const makeStore = () => {
    if (typeof window === "undefined") {
        //If it's on server side, create a store
        const mystore = createStore(reducer, bindMiddleware([thunkMiddleware]));
        return mystore;
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer } = require("redux-persist");

        const persistConfig = {
            key: "reactjs",
            // whitelist: ["userReducer"],
            whitelist: ["configReducer"],
            storage, // if needed, use a safer storage
        };

        const persistedReducer = persistReducer(persistConfig, combineReducer); // Create a new reducer with our existing reducer

        const store = createStore(
            persistedReducer,
            bindMiddleware([thunkMiddleware])
        );

        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return store;
    }
};

export const wrapper = createWrapper(makeStore);

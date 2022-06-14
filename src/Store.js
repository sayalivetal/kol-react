import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/AuthReducer";
// import productReducer from "./reducers/ProductReducer";
// import CartReducer from "./reducers/CartReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
//   user: authReducer,
//   product: productReducer,
//   cartData: CartReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
//   blacklist: ["product", "cartData", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistStorage = persistStore(Store);
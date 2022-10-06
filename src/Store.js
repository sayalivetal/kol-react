import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/AuthReducer";
import AuthSlice from "./slices/AuthSlice/AuthSlice";
import KolListing from "./slices/KolListing/KolSlices";
import chatReducer from "./slices/ChatSlice/ChatSlice";
import DealsReducer from "./slices/DealsSlice/DealsSlice";
// import productReducer from "./reducers/ProductReducer";
// import CartReducer from "./reducers/CartReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import dashboardReducer from "./slices/Dashboard/dashboard";

const reducers = combineReducers({
  user: AuthSlice,
  kolListing: KolListing,
  //   cartData: CartReducer,
  dashboard:dashboardReducer,

  chat: chatReducer,
  deal: DealsReducer,

});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [ "kolListing","chat","user"],
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

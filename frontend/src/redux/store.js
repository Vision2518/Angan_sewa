import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authState";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { indexSlice } from "./features/indexSlice";

const persistConfig = {
  key: "auth",        // ✅ changed key to "auth" 
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(indexSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
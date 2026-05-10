import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authState";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { indexSlice } from "./features/indexSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ ONLY persist user auth, nothing else
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
      serializableCheck: {
        // ✅ ignore redux-persist actions specifically
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(indexSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
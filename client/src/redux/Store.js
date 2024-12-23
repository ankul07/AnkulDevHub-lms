import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./auth/authSlice";
import coursesSlice from "./course/coursesSlice";

// Configuration to persist only specific keys
const authPersistConfig = {
  key: "auth", // Key for this slice's persisted storage
  storage,
  whitelist: ["isAuthenticated", "student"], // Persist only these keys
};

// Combine reducers
const rootReducer = combineReducers({
  student: persistReducer(authPersistConfig, authSlice), // Persisted
  courses: coursesSlice, // Not persisted
});

// Configure store with reducers
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;

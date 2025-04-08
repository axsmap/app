import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { api } from "../Services/api";
import theme from "./Theme";
import language from "./Language";
import tokenReducer from "./Auth/tokenSlice";
import loginReducer from "./Auth/loginSlice";
import userReducer from "./Auth/userSlice";
import searchReducer from "./Search/searchSlice";
import modalReducer from "./Modal/modalSlice";
import mapathonReducer from "./Mapathon/createMapathonSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const reducers = combineReducers({
  theme,
  language,
  token: tokenReducer,
  login: loginReducer,
  user: userReducer,
  search: searchReducer,
  modal: modalReducer,
  mapathon: mapathonReducer,
  api: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme", "language", "token", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default
    //   middlewares.push(createDebugger())
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor, useAppSelector };

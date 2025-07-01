import {
  configureStore,
  combineReducers,
  type Middleware,
  type Dispatch,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import layoutReducer from './layoutSlice';
import { autosaveMiddleware } from './autosaveMiddleware';

const rootReducer = combineReducers({
  layout: layoutReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        autosaveMiddleware as Middleware<unknown, RootState, Dispatch<UnknownAction>>
      ),
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;


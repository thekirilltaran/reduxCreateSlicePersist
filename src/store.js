import { configureStore } from "@reduxjs/toolkit";
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';


import {filterReducer} from './features/Filters/filter-slice';
import {todoReducer} from './features/Todos/todos-slice';

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ]
    }
  })
});

export const persistor = persistStore(store);

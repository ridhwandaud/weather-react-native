import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../_Reducers';

/* Middlewares */
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['WeatherReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);
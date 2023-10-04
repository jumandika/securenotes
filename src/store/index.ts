import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import EncryptedStorage from 'react-native-encrypted-storage';
import { api } from '../services/api';
import theme from './theme';

const reducers = combineReducers({
  theme,
  [api.reducerPath]: api.reducer,
});

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const setSecureStorage = async (key: string, value: any) => {
  try {
    await EncryptedStorage.setItem(
      key,
      JSON.stringify(value)
    );
    return true;
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

export const getSecureStorage = async (key: string) => {
  try {
    const value = await EncryptedStorage.getItem(key);

    if (value !== undefined) {
      // Congrats! You've just retrieved your first value!
      return value;
    } else {
      return false
    }
  } catch (error) {
    return false
    // There was an error on the native side
  }
}

export const removeSecureStorage = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

export const clearSecureStorage = async () => {
  try {
    await EncryptedStorage.clear();
    // Congrats! You've just cleared the device storage!
  } catch (error) {
    // There was an error on the native side
  }
}

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

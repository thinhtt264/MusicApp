import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import { appReducer, authReducer } from './action-slices';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['userInfo', 'isRemember'],
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp'],
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import {
  appReducer,
  authReducer,
  homeReducer,
  playerReducer,
} from './action-slices';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['loadingApp'],
};

const playerPersistConfig = {
  key: 'player',
  storage: AsyncStorage,
  blacklist: [],
};

const homePersistConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['searchRecentData'],
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  home: persistReducer(homePersistConfig, homeReducer),
  player: persistReducer(playerPersistConfig, playerReducer),
});

export default rootReducer;

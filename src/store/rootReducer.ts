import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers, persistReducer } from 'redux-persist';
import {
  appReducer,
  artistReducer,
  authReducer,
  homeReducer,
  playerReducer,
  profileReducer,
  searchReducer,
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
  whitelist: ['currentTrack'],
};

const searchPersistConfig = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['searchRecentData'],
};

const profilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  home: homeReducer,
  player: persistReducer(playerPersistConfig, playerReducer),
  search: persistReducer(searchPersistConfig, searchReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  artist: artistReducer,
});

export default rootReducer;

import {MMKV} from 'react-native-mmkv';
import {configurePersistable} from 'mobx-persist-store';
const storage = new MMKV();

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: key => storage.getString(key),
    removeItem: key => storage.delete(key),
  },
});
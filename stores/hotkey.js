import { initHotKeyValue } from "../constants/index"
import { makeAutoObservable } from "mobx";
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class Hotkey {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: Hotkey.name,
            debugMode: false,
            properties: [
              'hotkey',
            ],
          });
    }
    hotkey = initHotKeyValue;
    setKeyValue = (keyName, value) => {
        this.hotkey[keyName] = value;
    }
    hydrate = async () => {
        await hydrateStore(this);
      };
}
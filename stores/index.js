import React from 'react';
import './_hydration';
import { Hotkey } from './hotkey';
import { Library } from './library';

const stores = {
  hotkey: new Hotkey(),
  library: new Library(),
};
export default stores;

const StoreContext = React.createContext(stores);

export const StoreProvider = (props) => {
  return (
    <StoreContext.Provider value={stores}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStores = () => React.useContext(StoreContext);

export const hydrateStores = async () => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores)[key];

      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};

import React from 'react';
import MainstackNavigtor from './src/navigation';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import stores from './src/store';
const {persistor, store} = stores;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainstackNavigtor />
      </PersistGate>
    </Provider>
  );
}

export default App;

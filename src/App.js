import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './Store';

import Weather from './Screens/Weather';


const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Weather />
    </PersistGate>
  </Provider>
);

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import { AppRoute } from './router';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nProvider } from './providers';
import { Provider } from 'react-redux'
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <I18nProvider>
          <AppRoute />
        </I18nProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from './configs/apiConfig';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div>Hello World!</div>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

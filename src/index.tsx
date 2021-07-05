import React from 'react';
import { NativeBaseProvider, Flex } from 'native-base';
import { ApolloProvider } from '@apollo/client';

import Navigator from './pages';
import apollo from './apollo';
import theme from './theme';

export default function Client() {
  return (
    <NativeBaseProvider theme={theme}>
      <ApolloProvider client={apollo}>
        <Navigator />
      </ApolloProvider>
    </NativeBaseProvider>
  );
}

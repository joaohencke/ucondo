import { InMemoryCache } from '@apollo/client';
import chartAccounts from './chartAccounts';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...chartAccounts,
      },
    },
  },
});

export default cache;

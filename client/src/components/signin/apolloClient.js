import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://estro-schuster-1.myshopify.com/api/2023-04/graphql.json',
  headers: {
    'X-Shopify-Storefront-Access-Token': '710dd918a3ac6e17efcdb7ba67da4ebf',
  },
  cache: new InMemoryCache(),
});

export default client;
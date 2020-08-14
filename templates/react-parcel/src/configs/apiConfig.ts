import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { auth } from 'firebase/app';
import { setContext } from 'apollo-link-context';

const apiUrl = process.env.API_URL;

const httpLink = new HttpLink({
  uri: apiUrl
});

const authMiddleware = setContext(async (req, { headers }) => {
  const user = auth().currentUser;
  const token = user && (await user.getIdToken());

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined
    }
  };
}) as any;

export const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache()
});

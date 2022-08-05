// fetch api of post
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: process.env.baseUrl, });

const authMiddleware = new ApolloLink((operation, forward) => {
const token = process.env.token;
  operation.setContext({
    headers: {
        authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

export const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    // cache:false
});


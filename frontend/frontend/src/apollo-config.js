import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// proper way of importing createUploadLink
// https://github.com/jaydenseric/apollo-upload-client/blob/master/createUploadLink.mjs
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: import.meta.env.VITE_BACKEND_SERVER + '/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token'); // Retrieve token
  const user = localStorage.getItem('user'); // Retrieve user id
  let userId = null
  if (user){
    userId = JSON.parse(user).id
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers, // Preserve existing headers
      authorization: token ? `Bearer ${token}` : '', // Add Authorization
      'USER-ID': userId || '', // Add custom header
    },
  }));

  // Pass the operation forward
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([authLink,httpLink]),
  cache: new InMemoryCache(),
});

// export const apolloClient = new ApolloClient({
//   link: authLink.concat(ApolloLink.from([
//     createUploadLink({
//       uri: "http://127.0.0.1:8000/graphql",
//     })
//   ])),
//   cache: new InMemoryCache(),
// });

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

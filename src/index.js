import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AUTH_TOKEN } from "./constants";
import { setContext } from "apollo-link-context";
import "./index.css";

const httpLink = createHttpLink({
  uri: "http://167.71.41.6:1337/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes client={client} />
  </ApolloProvider>,
  document.getElementById("root")
);

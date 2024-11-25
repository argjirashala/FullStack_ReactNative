import React from "react";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import Main from "./main";
import createApolloClient from "./utils/apolloClient";
import AuthStorage from "./utils/authStorage";

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
};

export default App;

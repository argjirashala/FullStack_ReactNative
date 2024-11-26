import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import AuthStorage from "./authStorage";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const authStorage = new AuthStorage();
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const link = authLink.concat(httpLink);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

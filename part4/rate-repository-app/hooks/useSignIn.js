import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import AuthStorage from "../utils/authStorage";
import { useNavigate } from "react-router-native";

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const authStorage = new AuthStorage();

const useSignIn = () => {
  const [mutate] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
        navigate("/repositories");
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      throw error;
    }
  };

  return [signIn];
};

export default useSignIn;

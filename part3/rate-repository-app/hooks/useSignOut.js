import { useApolloClient } from "@apollo/client";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const useSignOut = () => {
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  return signOut;
};

export default useSignOut;

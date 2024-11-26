import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import { SignUpContainer } from "./SignUpContainer";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { username, password } });

      await signIn({ username, password });

      navigate("/");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  return <SignUpContainer onSubmit={handleSignUp} />;
};

export default SignUp;

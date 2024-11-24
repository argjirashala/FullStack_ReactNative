import React from "react";
import { NativeRouter } from "react-router-native";
import Main from "./main";

const App = () => {
  return (
    <NativeRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Main />
    </NativeRouter>
  );
};

export default App;

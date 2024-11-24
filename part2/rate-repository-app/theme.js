import { Platform } from "react-native";

const theme = {
  colors: {
    appBarBackground: "#24292e",
    textPrimary: "#ffffff",
  },
  fontFamily: Platform.select({
    android: "Roboto",
    ios: "Arial",
    default: "System",
  }),
};

export default theme;

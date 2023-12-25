import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const inputStyle = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.gray,
    fontFamily: "mon-sb",
    fontSize: 15,
    width: "80%",
  },
});

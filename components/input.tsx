import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import { InputModeOptions, TextInput, View } from "react-native";
import { inputStyle } from "./styles/input.style";

interface Props {
  input: {
    name: string;
    inputMode: InputModeOptions;
    icon: "envelope" | "lock" | "user" | "id-card" | "quote-left";
    placeholder: string;
  };
  control: any;
  errors: any;
}

export default function Input({ input, control, errors }: Props) {
  return (
    <View
      key={input.name}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
      <FontAwesome size={30} name={input.icon} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              inputStyle.input,
              {
                borderColor: errors[input.name] ? "red" : "transparent",
              },
            ]}
            secureTextEntry={input.name === "password"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            inputMode={input.inputMode}
            placeholder={input.placeholder}
          />
        )}
        name={input.name}
        rules={{ required: true }}
      />
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  InputModeOptions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormError from "../../components/formError";
import Input from "../../components/input";
import Colors from "../../constants/Colors";
import { BACK_URL, save } from "../../constants/utils";

const loginInputs = [
  {
    name: "email",
    inputMode: "text" as InputModeOptions,
    icon: "envelope" as "envelope",
    placeholder: "Email",
  },
  {
    name: "password",
    inputMode: "text" as InputModeOptions,
    icon: "lock" as "lock",
    placeholder: "Mot de passe",
  },
];

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onError = (errors: any, e: any) => {
    return console.log(errors);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACK_URL}/api/login`, {
        ...data,
      });

      if (res.status === 200) {
        save("authToken", res.data.token);
        router.push("/scan");
      }
    } catch (e: any) {
      if (e?.response?.data?.error) {
        setError(e?.response?.data?.error);
        console.log(`Custom Error Message: ${e?.response?.data?.error}`);
      } else {
        console.log(`Error while login : ${e}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={25}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <SafeAreaView style={style.container}>
        <Image
          style={{ resizeMode: "contain", height: "45%" }}
          source={require("../../assets/images/loginLogo.png")}
        />
        <Text style={style.header}>Amigo</Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            width: "75%",
          }}
        >
          {loginInputs.map((input) => (
            <Input
              key={input.name}
              input={input}
              control={control}
              errors={errors}
            />
          ))}

          <FormError error={error} />

          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit(onSubmit, onError)}
            style={[
              style.loginBtn,
              {
                backgroundColor: loading ? Colors.gray : Colors.primary,
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 15,
                fontFamily: "mon-sb",
              }}
            >
              Connexion
            </Text>
          </TouchableOpacity>
          <Text>
            Vous n'avez pas de compte ?{" "}
            <Text
              onPress={() => router.push("/(login)/register")}
              style={{ textDecorationLine: "underline" }}
            >
              Créer un compte
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    fontSize: 40,
    fontFamily: "mon-b",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.gray,
    fontFamily: "mon-sb",
    fontSize: 15,
    width: "80%",
  },
  loginBtn: {
    width: 300,
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 20,
  },
});

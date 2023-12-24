import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { BACK_URL, save } from "../../constants/utils";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    // todo: store token after login
    // todo show errors
    setLoading(true);
    try {
      const res = await axios.post(`${BACK_URL}/api/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        save("authToken", res.data.token);
        router.push("/scan");
      }
      setError(res.data.error);
    } catch (e: any) {
      console.log(`Error while login : ${e}`);
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Ionicons size={30} name="mail" />
            <TextInput
              inputMode="email"
              keyboardType="email-address"
              autoComplete="email"
              placeholder="Email"
              onChangeText={setEmail}
              style={style.input}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <FontAwesome size={30} name={"lock"} />
            <TextInput
              onChangeText={setPassword}
              autoComplete="password"
              placeholder="Mot de passe"
              secureTextEntry={true}
              style={style.input}
            />
          </View>
          {error && (
            <Text style={{ color: "red", fontFamily: "mon-b" }}>{error}</Text>
          )}
          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
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

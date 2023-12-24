import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
import { BACK_URL, save } from "../../constants/utils";
import { User } from "../../types/type";

export default function Register() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    // todo: store token after login
    // todo show errors
    setLoading(true);
    try {
      const res = await axios.post(`${BACK_URL}/api/register`, {
        ...user,
      });
      if (res.status === 200) {
        save("authToken", res.data.token);
        router.push("/scan");
      }
      setError(res.data.error);
    } catch (e: any) {
      console.log(`Error while register : ${e}`);
    } finally {
      setLoading(false);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const newUser: any = { ...user, dateOfBirth: date };
    setUser(newUser);
    hideDatePicker();
  };

  return (
    <ScrollView>
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
          style={{ resizeMode: "contain", height: "20%" }}
          source={require("../../assets/images/registerLogo.png")}
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
            <FontAwesome size={30} name="user" />
            <TextInput
              inputMode="text"
              autoComplete="name"
              placeholder="Prénom"
              style={style.input}
              onChangeText={(text) => {
                const newUser: any = { ...user, firstName: text };
                setUser(newUser);
              }}
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
            <FontAwesome size={30} name="id-card" />
            <TextInput
              inputMode="text"
              autoComplete="name-family"
              placeholder="Nom"
              style={style.input}
              onChangeText={(text) => {
                const newUser: any = { ...user, lastName: text };
                setUser(newUser);
              }}
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
            <FontAwesome size={30} name="birthday-cake" />
            <TouchableOpacity onPress={showDatePicker} style={style.input}>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  color: "black",
                  opacity: 0.25,
                  fontSize: 15,
                }}
              >
                {user?.dateOfBirth?.toLocaleDateString() ?? "Date de naissance"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={user?.dateOfBirth ?? new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
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
            <Ionicons size={30} name="mail" />
            <TextInput
              inputMode="email"
              keyboardType="email-address"
              autoComplete="email"
              placeholder="Email"
              style={style.input}
              onChangeText={(text) => {
                const newUser: any = { ...user, email: text };
                setUser(newUser);
              }}
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
              autoComplete="password"
              placeholder="Mot de passe"
              secureTextEntry={true}
              style={style.input}
              onChangeText={(text) => {
                const newUser: any = { ...user, password: text };
                setUser(newUser);
              }}
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
            <FontAwesome size={30} name="quote-left" />
            <TextInput
              inputMode="text"
              placeholder="Description de votre compte"
              style={style.input}
              onChangeText={(text) => {
                const newUser: any = { ...user, details: text };
                setUser(newUser);
              }}
            />
          </View>

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
              Créer un compte
            </Text>
          </TouchableOpacity>
          <Text>
            Vous avez déjà un compte ?{" "}
            <Text
              onPress={() => router.push("/(login)/login")}
              style={{ textDecorationLine: "underline" }}
            >
              Se connecter
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
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

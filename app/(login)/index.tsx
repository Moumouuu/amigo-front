import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

export default function Home() {
  const router = useRouter();
  return (
    <View>
      <Stack.Screen
        options={{
          title: "",
          header: () => null,
        }}
      />
      <SafeAreaView style={style.container}>
        <Image
          style={{ height: "55%" }}
          source={require("../../assets/images/homePageLogo.png")}
        />
        <Text style={style.header}>Amigo</Text>
        <Text style={style.label}>
          Un clic, tous vos réseaux. Simplifiez votre connexion, partagez
          instantanément !
        </Text>
        <View style={{ paddingVertical: 30 }}></View>
        <TouchableOpacity
          onPress={() => router.push("/(login)/login")}
          style={style.loginBtn}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15,
              fontFamily: "mon-sb",
            }}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(login)/register")}
          style={style.registerBtn}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 15,
              fontFamily: "mon-sb",
            }}
          >
            Créer un compte
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    fontFamily: "mon-b",
  },
  label: {
    fontSize: 20,
    fontFamily: "mon",
    color: "grey",
    width: "80%",
    textAlign: "center",
    marginTop: 10,
  },
  loginBtn: {
    width: 300,
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  registerBtn: {
    marginTop: 10,
    width: 300,
    paddingVertical: 20,
    backgroundColor: Colors.gray,
    borderRadius: 10,
  },
});

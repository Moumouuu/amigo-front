import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  InputModeOptions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FormError from "../../components/formError";
import Input from "../../components/input";
import { inputStyle } from "../../components/styles/input.style";
import Colors from "../../constants/Colors";
import { BACK_URL, save } from "../../constants/utils";

const registerInputs = [
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
  {
    name: "firstName",
    inputMode: "text" as InputModeOptions,
    icon: "user" as "user",
    placeholder: "Prénom",
  },
  {
    name: "lastName",
    inputMode: "text" as InputModeOptions,
    icon: "id-card" as "id-card",
    placeholder: "Nom",
  },
  {
    name: "details",
    inputMode: "text" as InputModeOptions,
    icon: "quote-left" as "quote-left",
    placeholder: "Description du compte",
  },
];

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const router = useRouter();

  const onError = (errors: any, e: any) => {
    return console.log(errors);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACK_URL}/api/register`, {
        ...data,
        dateOfBirth: dateOfBirth?.toISOString(),
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
        console.log(`Error while register : ${e}`);
      }
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
    setDateOfBirth(date);
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
          {registerInputs.map((input) => (
            <Input
              key={input.name}
              input={input}
              control={control}
              errors={errors}
            />
          ))}

          <InputCalendar
            showDatePicker={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            hideDatePicker={hideDatePicker}
            handleConfirm={handleConfirm}
            dateOfBirth={dateOfBirth}
          />

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

  loginBtn: {
    width: 300,
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 20,
  },
});

const InputCalendar = ({
  showDatePicker,
  isDatePickerVisible,
  hideDatePicker,
  handleConfirm,
  dateOfBirth,
}: {
  showDatePicker: () => void;
  isDatePickerVisible: boolean;
  hideDatePicker: () => void;
  handleConfirm: (date: any) => void;
  dateOfBirth: Date | null;
}) => {
  return (
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
      <TouchableOpacity onPress={showDatePicker} style={inputStyle.input}>
        <Text
          style={{
            fontFamily: "mon-sb",
            color: "black",
            opacity: 0.25,
            fontSize: 15,
          }}
        >
          {dateOfBirth?.toLocaleDateString() ?? "Date de naissance (optionnel)"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={dateOfBirth ?? new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

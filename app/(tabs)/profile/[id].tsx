import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ProfilePage() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProfilePage {id}</Text>
    </View>
  );
}

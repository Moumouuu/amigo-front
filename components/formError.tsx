import React from "react";
import { Text } from "react-native";

export default function FormError({ error }: { error: string | null }) {
  return (
    <>
      {error && (
        <Text style={{ color: "red", fontFamily: "mon-sb" }}>{error}</Text>
      )}
    </>
  );
}

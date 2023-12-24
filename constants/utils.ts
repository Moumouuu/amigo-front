import * as SecureStore from "expo-secure-store";

export const BACK_URL = "http://localhost:8000";

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
    alert("🔐 Here's your value 🔐 \n" + result);
    return result;
  } else {
    alert("No values stored under that key.");
    return null;
  }
}

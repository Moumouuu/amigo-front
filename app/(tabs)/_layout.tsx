import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  //todo get user id
  const userId = 1;

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
      }}
    >
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="camera" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="amigo"
        options={{
          href: "/(modals)/amigoModal",
          tabBarLabel: () => null,
          tabBarIcon: ({ size }) => (
            <Image
              style={{ width: size + 20, height: size + 20 }}
              source={require("../../assets/images/icon.png")}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/[id]"
        options={{
          href: {
            pathname: "/profile/[id]",
            params: {
              id: userId,
            },
          },
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

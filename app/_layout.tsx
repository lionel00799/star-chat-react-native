import { Stack } from "expo-router";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="StartScreen" options={{ title: "Start" }} />
        <Stack.Screen name="LoginScreen" options={{ title: "Login" }} />
        <Stack.Screen name="RegisterScreen" options={{ title: "Register" }} />
        <Stack.Screen
          name="ResetPasswordScreen"
          options={{ title: "Reset Password" }}
        />
        <Stack.Screen name="User" options={{ title: "User" }} />
        <Stack.Screen name="AddUser" options={{ title: "AddUser" }} />
        <Stack.Screen name="ChatScreen" options={{ title: "Chat" }} />
      </Stack>
    </Provider>
  );
}

import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import { theme } from "@/constants/theme";
import Button from "@/components/Button";
import { login } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "expo-router";
import { saveUserId, getUserId } from "@/utils/handleUserId";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });

      await saveUserId(response.userId);

      router.push("/User");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Background>
        <Logo />
        <Header>Welcome Login</Header>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default LoginScreen;

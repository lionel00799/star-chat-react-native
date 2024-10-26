import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";
import { register } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await register({ email, password });
      console.log(response);
      alert("Registration successful!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToLogin = () => {
    router.push("/LoginScreen");
  };

  return (
      <Background>
        <Logo />
        <Header>Create Account</Header>
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
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={handleToLogin}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default RegisterScreen;

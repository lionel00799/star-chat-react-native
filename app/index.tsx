import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { useRouter } from "expo-router";

const StartScreen = () => {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/LoginScreen");
  };

  const handleNavigateToRegister = () => {
    router.push("/RegisterScreen");
  };

  return (
      <Background>
        <Logo />
        <Header>Star Chat</Header>
        <Paragraph>
          The easiest way to start with your amazing application.
        </Paragraph>
        <Button mode="contained" onPress={handleNavigateToLogin}>
          Login
        </Button>
        <Button mode="outlined" onPress={handleNavigateToRegister}>
          Sign Up
        </Button>
      </Background>
  );
};

export default StartScreen;

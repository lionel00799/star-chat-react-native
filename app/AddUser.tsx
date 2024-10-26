// AddUser.tsx
import React, { useState } from "react";
import Background from "@/components/Background";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { fetchFriendData } from "@/services/friendinfo";
import { searchFriendname } from "@/services/userinfo";
import { getUserId } from "@/utils/handleUserId";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/store";
import { User } from "@/store/store";

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Fetch the friend data using the entered username
      const friendData: { name: string; email: string } = await fetchFriendData(
        username
      );

      console.log("Friend data:", friendData);

      const userId = await getUserId();
      const success = await searchFriendname(username, userId);
      if (success) {
        // Dispatch the new user to the Redux store
        const newUser: User = {
          name: friendData.name,
          email: friendData.email
        };
        dispatch(addUser(newUser));

        // Navigate back to the Users page
        router.push("/User"); // Make sure the path is correct
      }
    } catch (error) {
      console.error("Error fetching friend data:", error);
      alert("No Friend!");
    }
  };

  return (
      <Background>
        <Logo />
        <Header>Add Your Friend</Header>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
          autoCapitalize="none"
          autoCompleteType="text"
          textContentType="text"
          keyboardType="text"
        />
        <Button mode="contained" onPress={handleSubmit}>
          Add
        </Button>
      </Background>
  );
};

export default AddUser;

// Users.tsx
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser } from "@/store/store";
import ContactRow from "../components/ContactRow";
import { Colors } from "@/constants/Colors";
import Cell from "../components/Cell";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getFriendList } from "@/services/status";
import { getUserId } from "@/utils/handleUserId";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: { users: { users: any[] } }) => state.users.users);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const userId = await getUserId();
        const friendList = await getFriendList(userId);
        dispatch(setUsers(friendList));
      } catch (error) {
        console.error("Failed to fetch friend list:", error);
      }
    };

    fetchFriendList();
  }, [dispatch]);

  useEffect(() => {
    if (params?.newFriend) {
      const newFriend = JSON.parse(params.newFriend as string);
      const newUser = {
        id: `user_${Date.now()}`,
        name: newFriend.name,
        email: newFriend.email,
      };
      dispatch(addUser(newUser));
    }
  }, [params?.newFriend, dispatch]);

  const handleNewUser = () => {
    router.push("/AddUser");
  };

  const handleToChat = (friendName: any) => {
    router.push({
      pathname: "/ChatScreen",
      params: {
        friendName: friendName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Cell
        title="New Friend"
        icon="person-add"
        tintColor={Colors.teal}
        onPress={handleNewUser}
        style={{ marginBottom: 10 }}
      />

      {users.length === 0 ? (
        <View style={styles.blankContainer}>
          <Text style={styles.textContainer}>No registered users yet</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            <Text style={styles.textContainer}>Registered users</Text>
          </View>
          {users.map((user, index) => (
            <ContactRow
              key={index}
              name={user.name}
              subtitle={user.email}
              showForwardIcon={true}
              onPress={() => handleToChat(user.name)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blankContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "300",
  },
});

export default Users;
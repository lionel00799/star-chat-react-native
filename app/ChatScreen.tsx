import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import io from "socket.io-client";
import { getUserId } from "@/utils/handleUserId";
import { useLocalSearchParams } from "expo-router";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

const socket = io.connect("http://192.168.140.238:3003");

const ChatScreen: React.FC = () => {
  const { friendName } = useLocalSearchParams<{ friendName: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // State to store the user ID

  useEffect(() => {
    // Fetch userId and store it in state
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
        const messageData = {
          senderId: id,
          receiver: friendName,
        };
        socket.emit("join_room", messageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserId();
  }, [friendName]);

  useEffect(() => {
    socket.on("load_old_messages", async (messages: any) => {
      const id: any = await getUserId();
      const formattedMessages = formatMessages(messages, id);
      setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedMessages));
    });

    socket.on("system_message", (message: any) => {
      console.log("Received system message:", message);
    });

    socket.on("receive_private_message", (data: any) => {
      addMessage(data.message, "other", data.send, new Date().toISOString());
    });

    return () => {
      socket.off("receive_private_message");
      socket.off("load_old_messages");
      socket.off("system_message");
    };
  }, [friendName]);

  const formatMessages = (messages: any[], id: string): IMessage[] => {
    return messages.map((msg) => ({
      _id: msg._id || uuidv4(), // Use uuidv4() for unique ID
      text: msg.message,
      createdAt: new Date(msg.timestamp),
      user: {
        _id: msg.sender._id.toString() === id ? id : "friend",
        name: msg.sender.username,
      },
    }));
  };

  const addMessage = (text: string, senderType: string, receiver: string, time: string) => {
    console.log("receiver: ", receiver, "userId: ", userId)
    const newMessage: IMessage = {
      _id: uuidv4(), // Use uuidv4() for unique ID
      text,
      createdAt: new Date(time),
      user: {
        _id: senderType === "other" ? "friend" : userId || "1", // Assign friend ID or your ID correctly
        name: friendName,
      },
    };
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
  };

  const sendMessage = async (message: string) => {
    try {
      const id = await getUserId();
      const messageData = {
        senderId: id,
        receiver: friendName,
        message,
      };
      socket.emit("send_private_message", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    newMessages.forEach((msg) => sendMessage(msg.text));
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{ backgroundColor: "#fff", borderRadius: 20 }}
        renderUsernameOnMessage={true}
        minInputToolbarHeight={56}
        scrollToBottom={true}
        user={{
          _id: userId || "1", // Set your own user ID here for correct message alignment
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
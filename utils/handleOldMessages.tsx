interface Message {
    message: string;
    sender: {
        _id: string;
        username: string;
    };
    timestamp: string;
}

interface FormattedMessage {
    text: string;
    sender: "user" | "other";
    name: string;
    time: string;
}

const formatMessages = (messages: Message[]): FormattedMessage[] => {
    // Retrieve the current user's ID from localStorage
    const userId = localStorage.getItem("userId");

    // Format each message
    return messages.map((msg) => {
        const isSender = msg.sender._id === userId;
        return {
            text: msg.message,
            sender: isSender ? "user" : "other",
            name: isSender ? "You" : msg.sender.username,
            time: new Date(msg.timestamp).toLocaleTimeString(),
        };
    });
};

export default formatMessages;
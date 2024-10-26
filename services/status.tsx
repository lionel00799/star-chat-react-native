import axios from 'axios';

// Define the types for friend list and friend status response
interface Friend {
    name: string;
    email: string;
}

interface FriendListResponse {
    friends: Friend[];
}

interface FriendStatusResponse {
    status: string;  // Define the type of status, e.g., 'online', 'offline'
}

const API_URL = 'http://192.168.140.238:3003/api/nativeStatus/';
const FRIEND_API_URL = 'http://192.168.140.238:3003/api/friendStatus/';

// Function to get the list of friends for a user
const getFriendList = async (userId: any): Promise<Friend[]> => {
    try {
        const response = await axios.get<FriendListResponse>(`${API_URL}?userId=${userId}`);
        return response.data.friends;
    } catch (error) {
        console.error('Failed to fetch friend list:', error);
        throw error;
    }
};

// Function to get the status of a specific friend
const getFriendStatus = async (friendname: string): Promise<string> => {
    try {
        const response = await axios.get<FriendStatusResponse>(`${FRIEND_API_URL}?friendname=${friendname}`);
        return response.data.status;
    } catch (error) {
        console.error('Failed to fetch friend status:', error);
        throw error;
    }
};

export { getFriendList, getFriendStatus };
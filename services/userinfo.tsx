import axios from 'axios';

// Define the expected types for user data and API responses
interface UserData {
    // Define the structure of the user data response, for example:
    id: string;
    name: string;
    email: string;
    // Add more fields as per the response data structure
}

interface SearchResponse {
    success: boolean;
    // Add more fields if the search API returns additional information
}

const FETCH_API_URL = 'http://192.168.140.238:3003/api/userinfo/';
const SEARCH_API_URL = 'http://192.168.140.238:3003/api/addfriend/';

const fetchUserData = async (): Promise<UserData> => {
    try {
        const token = localStorage.getItem('token');  // retrieve token from localStorage
        const userId = localStorage.getItem('userId'); // retrieve userId from localStorage
        
        // Ensure the userId and token exist before making the API call
        if (!token || !userId) {
            throw new Error('Missing token or userId in localStorage');
        }

        const response = await axios.get<UserData>(`${FETCH_API_URL}?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // include token if required
            }
        });

        console.log('User data fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.log('Failed to fetch user data:', error);
        throw error;
    }
};

const searchFriendname = async (friendname: string, userId: any): Promise<boolean> => {
    try {
        const response = await axios.get<SearchResponse>(`${SEARCH_API_URL}?friendname=${friendname}&userId=${userId}`);
        return response.data.success;
    } catch (error) {
        console.log('Failed to search friendname:', error);
        throw error;
    }
};

export { fetchUserData, searchFriendname };
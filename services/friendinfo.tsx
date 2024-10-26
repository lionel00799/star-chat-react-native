import axios from 'axios';

const FETCH_API_URL = 'http://192.168.140.238:3003/api/friendinfo/';

const fetchFriendData = async (friendname: string) => {
    try {
        const response = await axios.post(`${FETCH_API_URL}`, { friendname });

        console.log('User data fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.log('Failed to fetch user data:', error);
        throw error;
    }
};

export { fetchFriendData };
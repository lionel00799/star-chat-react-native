import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const saveUserId = async (userId: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('userId', userId);
  } else {
    await SecureStore.setItemAsync('userId', userId);
  }
};

const getUserId = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('userId');
  } else {
    return await SecureStore.getItemAsync('userId');
  }
};

const deleteUserId = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('userId');
  } else {
    await SecureStore.deleteItemAsync('userId');
  }
};

export { saveUserId, getUserId, deleteUserId };
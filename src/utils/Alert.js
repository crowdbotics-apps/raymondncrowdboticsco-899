import { Alert } from 'react-native';

export const alert = (text) => {
  Alert.alert('Error', text, [{ text: 'OK'}], { cancelable: false });
};
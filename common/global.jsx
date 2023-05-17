import { Alert } from 'react-native';
import IconBack from '../assets/back.png';

const headBar = (options) => {
  return Object.assign({
    headerTitleStyle: { color: '#FFFFFF' },
    headerStyle: { backgroundColor: '#2882FF' },
    statusBarColor: '#2882FF',
    headerBackImageSource: IconBack,
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerTintColor: '#fff',
    animationTypeForReplace: 'push', animation: 'slide_from_right'
  }, options);
};

export default headBar;

export function CommonAlert(title, message) {
  Alert.alert(title, message, [{ text: '确定' }])
}
export function SimpleAlert(message) {
  CommonAlert('', message)
}

export function AlertError(error) {
  SimpleAlert(error.message)
}
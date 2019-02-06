import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Login';
import SignupScreen from './Signup';

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: LoginScreen
    },
    signup: {
      screen: SignupScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'login'
  }
);

export default createAppContainer(AppNavigator);

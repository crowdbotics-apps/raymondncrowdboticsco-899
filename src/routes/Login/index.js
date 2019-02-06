import React from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from 'app/components';

import styles from './style';
import LogoIcon from 'app/assets/images/SLR-Logo.png';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  goToSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={this.state.email}
            autoCapitalize="none"
            onChangeText={value => this.inputChanged('email', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={this.state.password}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={value => this.inputChanged('password', value)}
          />
          <Button containerStyle={styles.loginBtn} textStyle={styles.login} text="Log In" />
          <View style={styles.signupContainer}>
            <Text style={styles.description}>Do not have an account? </Text>
            <Button
              containerStyle={styles.signupBtn}
              textStyle={styles.signup}
              text="Sign Up"
              onPress={this.goToSignUp}
            />
          </View>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

export default LoginScreen;

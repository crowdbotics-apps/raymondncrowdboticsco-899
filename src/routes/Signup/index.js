import React from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from 'app/components';
import { AuthController } from 'app/controllers';
import { alert } from 'app/utils/Alert';

import styles from './style';
import LogoIcon from 'app/assets/images/SLR-Logo.png';

const emailRegEx =
  // eslint-disable-next-line max-len
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpswd: '',
      agreeTerms: false
    };
  }

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  agreeTerms = () => {
    this.setState({
      agreeTerms: !this.state.agreeTerms
    });
  };

  validate = () => {
    let { name, email, password, confirmpswd } = this.state;
    if (!name) {
      alert('Name can\'t be empty!');
      return false;
    }
    if (!email) {
      alert('Email can\'t be empty!');
      return false;
    }
    if (!emailRegEx.test(email)) {
      alert('Email is not valid!');
      return false;
    }
    if (!password || !confirmpswd) {
      alert('Password can\'t be empty!');
      return false;
    }
    if (password !== confirmpswd) {
      alert('Password doesn\'t match!');
      return false;
    }
    if (password.length < 6) {
      alert('Password should be longer than 6 letters!');
      return false;
    }
    return true;
  };

  signup = async () => {
    // fields validation
    if (!this.validate()) {
      return;
    }
    let { name, email, password } = this.state;
    let user = await AuthController.signup({
      name,
      email,
      password
    });
    console.log(user);
  };

  goToLogin = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Name *"
              value={this.state.name}
              autoCapitalize="none"
              onChangeText={value => this.inputChanged('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email *"
              value={this.state.email}
              autoCapitalize="none"
              onChangeText={value => this.inputChanged('email', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password *"
              value={this.state.password}
              autoCapitalize="none"
              onChangeText={value => this.inputChanged('password', value)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              value={this.state.confirmpswd}
              autoCapitalize="none"
              onChangeText={value => this.inputChanged('confirmpswd', value)}
              secureTextEntry={true}
            />
            <CheckBox
              containerStyle={styles.termsContainer}
              title="Agree to Terms and Conditions"
              textStyle={styles.terms}
              checked={this.state.agreeTerms}
              onPress={this.agreeTerms}
            />
            <Button
              disabled={!this.state.agreeTerms}
              containerStyle={styles.signupBtn}
              textStyle={styles.signup}
              text="Sign Up"
              onPress={this.signup}
            />
            <View style={styles.loginContainer}>
              <Text style={styles.description}>Already have an account? </Text>
              <Button textStyle={styles.login} text="Log In" onPress={this.goToLogin} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SignupScreen.propTypes = {
  navigation: PropTypes.object
};

export default SignupScreen;

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext, Navbar } from 'app/components';

import styles from './style';

class RewardScreen extends Component {
  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar left="ios-menu" leftHandler={this.leftHandler} title="Rewards" />
      </View>
    );
  }
}

RewardScreen.contextType = AppContext;

RewardScreen.propTypes = {
  navigation: PropTypes.object
};

export default RewardScreen;

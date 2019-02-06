import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" animating={true} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

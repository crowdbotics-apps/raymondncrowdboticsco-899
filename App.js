import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppNavigator from 'app/routes';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <AppNavigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

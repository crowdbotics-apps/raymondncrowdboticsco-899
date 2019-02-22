import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { AppContext, Navbar, Button } from 'app/components';
import { CampaignController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/no_logo.jpg';

class ContestDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    let campaignId = this.props.navigation.state.params.campaignId;
    let data = await CampaignController.getCampaignById(campaignId);
    this.setState({
      data
    });
  }

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  rightHandler = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-arrow-back"
          leftHandler={this.leftHandler}
          title="Answers"
          right="Update"
          rightHandler={this.rightHandler}
        />
        <View style={styles.content} />
      </View>
    );
  }
}

ContestDetailsScreen.contextType = AppContext;

ContestDetailsScreen.propTypes = {
  navigation: PropTypes.object
};

export default ContestDetailsScreen;

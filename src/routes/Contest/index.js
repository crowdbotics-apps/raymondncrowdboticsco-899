import React, { Component } from 'react';
import { View, FlatList, Image, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

let dm = Dimensions.get('screen');

import { AppContext, Navbar, Button } from 'app/components';
import { CampaignController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/no_logo.jpg';

class ContestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      campaigns: []
    };
  }

  async componentDidMount() {
    let campaigns = await CampaignController.getCampaigns();
    this.setState({ campaigns });
  }

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  handleTabChange = index => {
    this.setState({ selectedTab: index });
  };

  handleCampaignPress = campaignId => () => {
    this.props.navigation.navigate('contestdetails', { campaignId });
  };

  renderCampaign = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.item_name}>{item.name}</Text>

        {item.logo ? (
          <FastImage
            source={{ uri: item.logo }}
            style={styles.item_logo}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Image source={NoLogoImage} style={styles.item_logo} resizeMode="cover" />
        )}
        <Progress.Bar progress={0.3} width={dm.width / 2 - 30} height={10} />
        <Button
          containerStyle={styles.item_button}
          text="Proceed"
          textStyle={styles.item_buttontext}
          onPress={this.handleCampaignPress(item.id)}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar left="ios-menu" leftHandler={this.leftHandler} title="Contests" />
        <SegmentedControlTab
          values={['New', 'All']}
          selectedIndex={this.state.selectedTab}
          onTabPress={this.handleTabChange}
          tabsContainerStyle={styles.tabContainer}
          tabStyle={styles.tab}
          activeTabStyle={styles.activeTab}
        />
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.campaigns}
          keyExtractor={item => item.id}
          renderItem={this.renderCampaign}
          extraData={this.state.campaigns}
        />
      </View>
    );
  }
}

ContestScreen.contextType = AppContext;

ContestScreen.propTypes = {
  navigation: PropTypes.object
};

export default ContestScreen;

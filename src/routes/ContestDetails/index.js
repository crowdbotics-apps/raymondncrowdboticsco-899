import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppContext, Navbar, Button } from 'app/components';
import { CampaignController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/no_logo.jpg';

class ContestDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      mediaStates: []
    };

    this.players = {};
  }

  async componentDidMount() {
    let campaignId = this.props.navigation.state.params.campaignId;
    let data = await CampaignController.getCampaignById(campaignId);
    let mediaStates = Array(data.questions.length).fill(true);
    this.setState({
      data,
      mediaStates
    });
  }

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  rightHandler = () => {};

  playVideo = index => () => {
    let { mediaStates } = this.state;
    mediaStates[index] = false;
    this.setState({ mediaStates });
    this.players[`${index}`].seek(0);
    this.players[`${index}`].presentFullscreenPlayer();
  };

  stopVideo = index => () => {
    let { mediaStates } = this.state;
    mediaStates[index] = true;
    this.setState({ mediaStates });
  };

  renderQuestion = (question, index) => {
    return (
      <View key={`${index}`} style={styles.questionItem}>
        <Text style={styles.qLabel}>Question{index + 1}</Text>
        {question.media_type &&
          (question.media_type.includes('image/') ? (
            <FastImage
              source={{ uri: question.media }}
              style={styles.qImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={styles.qVideoContainer}>
              <Video
                ref={ref => (this.players[`${index}`] = ref)}
                source={{ uri: question.media }}
                style={styles.qVideo}
                paused={this.state.mediaStates[index]}
                onFullscreenPlayerDidDismiss={this.stopVideo(index)}
              />
              <View style={styles.qVideoOverlay}>
                <TouchableOpacity onPress={this.playVideo(index)}>
                  <Ionicons name="md-arrow-dropright-circle" style={styles.qVideoPlayBtn} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    );
  };

  render() {
    let { data } = this.state;

    return (
      <View style={styles.container}>
        <Navbar
          left="ios-arrow-back"
          leftHandler={this.leftHandler}
          title="Answers"
          right="Update"
          rightHandler={this.rightHandler}
        />
        {data && (
          <ScrollView style={styles.scrollContent}>
            <View style={styles.content}>
              <Text style={styles.title}>{data.name}</Text>
              <FastImage
                style={styles.logo}
                source={data.logo ? { uri: data.logo } : NoLogoImage}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.dateContainer}>
                <View style={styles.from}>
                  <Text style={styles.label}>Start</Text>
                  <Text style={styles.date}>{moment(data.from).format('YYYY-MM-DD')}</Text>
                </View>
                <View style={styles.to}>
                  <Text style={styles.label}>End</Text>
                  <Text style={styles.date}>{moment(data.to).format('YYYY-MM-DD')}</Text>
                </View>
              </View>
              <View style={styles.qContainer}>
                {data.questions.map((question, index) => this.renderQuestion(question, index))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

ContestDetailsScreen.contextType = AppContext;

ContestDetailsScreen.propTypes = {
  navigation: PropTypes.object
};

export default ContestDetailsScreen;

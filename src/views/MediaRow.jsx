import
  React,
  {
    StyleSheet, Text, View, Image, ListView, TouchableOpacity, SliderIOS, ScrollView, Animated, PropTypes
   } from 'react-native';
import { MediaView } from '../views';
import Moment from 'moment';


export default class MediaRow extends React.Component {

  static propTypes = {
    media: PropTypes.object
  }

  state = {
    rowAnimation: new Animated.Value(0)
  }

  onRowPress(media) {
    this.props.navigator.push({
      component: MediaView,
      title: 'Details',
      passProps: { media: media }
    });
  }

  onImageLoad() {
    Animated.timing(
      this.state.rowAnimation,
      {
        toValue: 1
      }
    ).start();
  }

  render() {
    const { media } = this.props;
    const createdTime = Moment(media.created_time * 1000, 'x').fromNow();

    return (
      <Animated.View key={media.id} style={[styles.container, {
          opacity: this.state.rowAnimation,
          transform: [{
            translateY: this.state.rowAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0]
            })
          }]
        }]}>
        <TouchableOpacity onPress={this.onRowPress.bind(this, media)}>
          <View style={styles.thumbContainer}>
            <Image
              source={{uri: media.images.low_resolution.url}}
              style={styles.thumbnail}
              onLoad={::this.onImageLoad}
            />
            <Text style={styles.date}>
              {createdTime}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: '#eeeeee'
  },
  thumbContainer: {
    shadowColor: "#000000",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: .3,
    shadowRadius: 5,
    borderRadius: 5,
    width: 306,
    height: 306,
    position: 'relative'
  },
  date: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 11,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0}
  },
  thumbnail: {
    width: 306,
    height: 306,
    borderRadius: 5
  }
});

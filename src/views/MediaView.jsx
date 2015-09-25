import React, { View, Image, StyleSheet, PropTypes, MapView, Text, LinkingIOS, TouchableOpacity } from 'react-native';

export default class MediaView extends React.Component {

  static propTypes = {
    media: PropTypes.object
  }

  onImagePress() {
    LinkingIOS.openURL(this.props.media.link);
  }

  render() {
    const { media } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <TouchableOpacity onPress={::this.onImagePress}>
            <Image
              source={{ uri: media.images.standard_resolution.url }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.userWrap}>
              <Image
                source={{ uri: media.user.profile_picture }}
                style={styles.user}
              />
          </View>
          <Text numberOfLines={6} style={styles.text}>{media.caption.text}</Text>
        </View>
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: media.location.latitude,
            longitude: media.location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          annotations={[{
            latitude: media.location.latitude,
            longitude: media.location.longitude,
            title: media.location.name,
            animateDrop: true
          }]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 62,
    backgroundColor: '#eeeeee',
  },
  thumbnail: {
    width: 376,
    height: 376
  },
  mediaContainer: {
    width: 376,
    height: 376,
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  map: {
    flex: 1
  },
  textContainer: {
    marginTop: -100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userWrap: {
    padding: 5,
    justifyContent: 'center'
  },
  user: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    margin: 10
  }
});

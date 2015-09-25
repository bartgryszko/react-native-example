import
  React,
  {
    StyleSheet, Text, View, Image, ListView, TouchableOpacity, SliderIOS, ScrollView, AlertIOS
   } from 'react-native';
import { MediaRow } from '../views';

const INSTAGRAM_CLIENT_ID = '8ef2af4f200f4c5b9c207517af3a7ef7';

export default class MediaList extends React.Component {

  state = {
    position: false,
    sliderPosition: 1,
    distance: 1,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    loaded: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.position && this.state.position) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  fetchData() {
    const lat = this.state.position.coords.latitude;
    const lng = this.state.position.coords.longitude;
    const distance = Math.round(this.state.distance * 1000);

    fetch(`https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&distance=${distance}&client_id=${INSTAGRAM_CLIENT_ID}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true
        });
      })
      .done();
  }

  refetchData() {
    this.setState({loaded: false, sliderPosition: this.state.distance});
    this.fetchData();
  }

  retryAlert(error = false) {
    console.log('LOCALIZATION ERRROR', error);

    AlertIOS.alert(
      'Localization Error',
      'Couldn\'t fetch your current localization. Retry?',
      [
        {text: 'Yes', onPress: () => this.getCurrentPosition()},
        {text: 'No', onPress: () => console.log('No')},
      ]
    )
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => this.retryAlert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  renderRow(media) {
    return <MediaRow media={media} key={media.id} loaded={this.state.loaded} navigator={this.props.navigator} />;
  }

  renderHeader() {
    return (
      <View style={styles.sliderContainer}>
        <SliderIOS
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={5}
          value={this.state.sliderPosition}
          onValueChange={(value) => this.setState({distance: value})}
          onSlidingComplete={() => ::this.refetchData()}/>
        <Text style={styles.sliderText}>I'm searching {Math.round(this.state.distance*10)/10} kilometers around you</Text>
        <Text style={styles.sliderTextLoader}>
          {this.state.loaded || 'Loading...'}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        scrollRenderAheadDistance={0}
        renderHeader={::this.renderHeader}
        dataSource={this.state.dataSource}
        renderRow={::this.renderRow}
        style={styles.listView}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#eeeeee'
  },
  sliderContainer: {
    alignItems: 'center',
    marginTop: -10,
    paddingBottom: 20
  },
  sliderTextLoader: {
    fontSize: 11,
    color: '#afafaf'
  },
  sliderText: {
    fontSize: 12,
    marginTop: 10,
    color: '#838383'
  },
  slider: {
    width: 300
  }
});

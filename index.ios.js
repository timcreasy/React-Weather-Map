const React = require('react');
const {
  AppRegistry,
  MapView,
  View,
  StyleSheet,
  Text
} = require('react-native');
const Api = require('./src/api');
var createFragment = require('react-addons-create-fragment');

const Weather = React.createClass({

  getInitialState() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      }
    };
  },

  onRegionChangeComplete(region) {

    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      },
      city: '',
      temperature: '',
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data)
        this.setState(data);
      });

  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => Weather)
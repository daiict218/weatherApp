import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

import {fetchWeather} from './weatherAPI';

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella'
};

const phrases = {
  Default: {
    title: 'Fetching the fucking weather',
    subtitle: 'Be Patient',
    highlight: 'fucking',
    color: '#636363',
    background: '#9C9C9C'
  },
  Clear: {
    title: 'It\'s fucking amaze balls',
    subtitle: 'Rock the shit',
    highlight: 'fucking',
    color: '#E32500',
    background: '#FFD017'
  },
  Rain: {
    title: 'Rain rain go away',
    subtitle: 'Stay inside and code all day',
    highlight: 'away',
    color: '#004A96',
    background: '#2F343A'
  },
  Thunderstorm: {
    title: 'Fucking thunderstrike',
    subtitle: 'Unplug those devices',
    highlight: 'Fucking',
    color: '#FBFF46',
    background: '#020202'
  },
  Clouds: {
    title: 'Cloud storage limit reached',
    subtitle: 'error : 5000 circocumulus',
    highlight: 'storage',
    color: '#0044FF',
    background: '#939393'
  },
  Snow: {
    title: 'Brain fucking freeze',
    subtitle: 'You are not supposed to eat it',
    highlight: 'fucking',
    color: '#021D4C',
    background: '#15A678'
  },
  Drizzle: {
    title: 'Meh... don\'t even ask',
    subtitle: 'What did I just say?',
    highlight: 'even',
    color: '#B3F6E4',
    background: '#1FBB68'
  }
};

class App extends React.Component{

  componentWillMount(){
    this.state = {
      hideStatusBar: true,
      temp: 0,
      weather: 'Default'
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation() {
    //FixMe: This gives wrong location :(
		navigator.geolocation.getCurrentPosition(
			(posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
				.then(res => this.setState({
					temp:Math.round(11),
					weather:'Drizzle'
				})),
			(error) => alert(error),
			{timeout:10000}
		)
	}

  render(){
    return (
      <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background}]}>
        <StatusBar hidden={this.state.hideStatusBar}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style={styles.temp}>{`${this.state.temp}°`}</Text>
        </View>
        <View style={styles.body}>
          <Highlighter
            style={styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'blue'
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white'
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-medium',
    fontSize: 16,
    color: 'white'
  },
  body: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 3,
    // backgroundColor: 'red',
    margin: 10
  }
});

AppRegistry.registerComponent('fuckingWeather', () => App);

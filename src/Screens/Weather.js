import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import moment from 'moment';
import ListItem from '../Components/ListItem';

class Weather extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { 
    	currentTime: moment().format('ddd, DD MMMM YYYY HH:mm A'),
    	average: 82,
    	weather: 'Thunderstorm'
    };
  }

  componentDidMount() {
  		  
  }

  render() {
    return (
      <SafeAreaView>
      	<View style={{ paddingVertical: 16, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }}>
	      	<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
	      		{this.state.currentTime}
	      	</Text>
	      	<Text style={{ fontWeight: 'bold', fontSize: 50 }}>
	      		{this.state.average}
	      	</Text>
	      	<Text style={{ color: 'grey', fontSize: 20 }}>
	      		{this.state.weather}
	      	</Text>
      	</View>
      	<ListItem />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});


export default Weather;
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import moment from 'moment';
import ListItem from '../Components/ListItem';
import Server from '../Helpers/Server';

class Weather extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { 
    	date: moment().format('ddd, DD MMMM YYYY HH:mm A'),
    	list: null,
    };
  }

  componentDidMount() {

  	// change to redux
    Server.get('forecast?lat=3.17&lon=101.5&appid=eb8a362432da223838169af4b1ce7649&units=imperial').then(({ data })=>{
    	console.log('data', data)
    	this.setState({ list: data.list })
    },
    (error)=>{
    	this.setState({ error: 'Failed to connect to server' })
    	console.log('error', error);
    })
  }

  render() {
    return (
      <SafeAreaView>
      	{
      		<View style={styles.errorContainer}>
      			<Text style={styles.errorText}>
	      			{this.state.error}
	      		</Text>
      		</View>
      	}
      	<View style={styles.header}>
	      	<Text style={styles.date}>
	      		{this.state.date}
	      	</Text>
	      	<Text style={styles.temp}>
	      		{ this.state.list && this.state.list[0].main.temp.toFixed(0)}
	      	</Text>
	      	<Text style={styles.weather}>
	      		{ this.state.list && this.state.list[0].weather[0].main}
	      	</Text>
      	</View>
      	<ListItem 
      		list={this.state.list} 
      		style={styles.list}
      	/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
	errorContainer: {
		justifyContent: 'center', 
		alignItems: 'center'
	},
	errorText: {
		color: '#e53935',
		fontWeight: 'bold', 
		fontSize: 25,
	},
	header: {
		paddingVertical: 16, 
		paddingHorizontal: 32, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	date: {
		fontWeight: 'bold', 
		fontSize: 20
	},
	temp: {
		fontWeight: 'bold', 
		fontSize: 50
	},
	weather: {
		color: 'grey', 
		fontSize: 20
	},
	list: {
		flex: 1,
	}
});


export default Weather;
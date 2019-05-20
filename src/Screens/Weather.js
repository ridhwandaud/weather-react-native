import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import moment from 'moment';
import ListItem from '../Components/ListItem';
import Server from '../Helpers/Server';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WeatherActions from '../_Actions/WeatherActions';

class Weather extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { 
    	date: moment().format('ddd, DD MMMM YYYY HH:mm A'),
    	index: 0,
    };
  }

  componentDidMount() {

  	const { WeatherActions } = this.props;
  	WeatherActions.getCurrentLocation();

  }

  onPress = (index) => {
  	this.setState({ index });
  }

  render() {
  	const { isLoading, list, city, error } = this.props;
    return (
      <View style={styles.container}>
      	<StatusBar backgroundColor="#e53935" barStyle="light-content" />
      	<View style={styles.nav}>
  			<Text style={styles.navText}>
      			{ city && `${city.name}, ${city.country}`}
      		</Text>
  		</View>
      	<View style={styles.errorContainer}>
  			<Text style={styles.errorText}>
      			{error}
      		</Text>
  		</View>
      	<View style={styles.header}>
	      	<Text style={styles.date}>
	      		{this.state.date}
	      	</Text>
	      	<Text style={styles.temp}>
	      		{ list && list[this.state.index].main.temp.toFixed(0)}
	      	</Text>
	      	<Text style={styles.weather}>
	      		{ list && list[this.state.index].weather[0].main}
	      	</Text>
      	</View>
      	<ListItem 
      		list={list} 
      		style={styles.list}
      		onPress={this.onPress}
      	/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
	},
	nav: {
		backgroundColor: '#e53935',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		paddingTop: Platform.OS === 'ios' ? 50 : 16,
	},
	navText: {
		color: 'white',
	},
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

const mapStateToProps = ({ WeatherReducer }) => ({
	isLoading: WeatherReducer.isLoading,
	list: WeatherReducer.list,
	city: WeatherReducer.city,
	error: WeatherReducer.error,
});

const mapDispatchToProps = (dispatch) => {
	return {
		WeatherActions: bindActionCreators(WeatherActions, dispatch)
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Weather);



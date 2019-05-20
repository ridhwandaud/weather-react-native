import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  AppState
} from 'react-native';
import moment from 'moment';
import Permissions from 'react-native-permissions'

import ListItem from '../Components/ListItem';
import Server from '../Helpers/Server';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WeatherActions from '../_Actions/WeatherActions';

import { PRIMARY_COLOR, GREY_COLOR } from '../Helpers/Colors';
import { DEFAULT_FONT_REGULAR, DEFAULT_FONT_BOLD, DEFAULT_FONT_LIGHT } from '../Helpers/Fonts';

class Weather extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { 
    	date: moment().format('ddd, DD MMMM YYYY HH:mm A'),
    	index: 0,
    	status: {},
    	types: [],
    };
  }

  componentDidMount() {

  	const { WeatherActions } = this.props;

  	// handle location permission
  	let types = Permissions.getTypes();

  	this._updatePermissions(types);

  	AppState.addEventListener('change', this._handleAppStateChange)

  	WeatherActions.getCurrentLocation((error) => {
  		Alert.alert(error);
  	});

  }

  //update permissions when app comes back from settings
  _handleAppStateChange = appState => {
  	console.log('_handleAppStateChange');
    if (appState == 'active') {
      this._updatePermissions(this.state.types)
    }
    WeatherActions.getCurrentLocation((error) => {
  		Alert.alert(error);
  	});
  }

  _updatePermissions = types => {
    Permissions.checkMultiple(types)
      .then(status => {
        if (this.state.isAlways) {
          return Permissions.check('location', 'always').then(location => ({
            ...status,
            location,
          }))
        }
        return status
      })
      .then(status => this.setState({ status }))
  }

  onPress = (index) => {
  	this.setState({ index });
  }

  render() {
  	const { isLoading, list, city, error } = this.props;
  	console.log('status', this.state.status)
    return (
      <View style={styles.container}>
      	<StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
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
		backgroundColor: PRIMARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		paddingTop: Platform.OS === 'ios' ? 50 : 16,
	},
	navText: {
		color: 'white',
		fontFamily: DEFAULT_FONT_REGULAR,
		fontSize: 16,
	},
	errorContainer: {
		justifyContent: 'center', 
		alignItems: 'center'
	},
	errorText: {
		color: PRIMARY_COLOR,
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
		fontSize: 20,
		fontFamily: DEFAULT_FONT_BOLD
	},
	temp: {
		fontSize: 50,
		fontFamily: DEFAULT_FONT_BOLD
	},
	weather: {
		fontFamily: DEFAULT_FONT_REGULAR,
		color: GREY_COLOR, 
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



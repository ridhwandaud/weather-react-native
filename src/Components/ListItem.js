'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <View style={{ borderBottomWidth: 1, borderColor: '#d3d3d3', padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
      	<View>
	      	<Text style={{ fontWeight: 'bold' }}>
	      		17 May 2018, Fri
	      	</Text>
	      	<Text>
	      		79 - 84 
	      	</Text>
	      	<Text style={{ color: 'grey' }}>
	      		Thunderstorm
	      	</Text>
      	</View>
      	<View style={{ justifyContent: 'center', alignSelf: 'center'}}>
	      	<Text>
	      		>
	      	</Text>
	    </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default ListItem;
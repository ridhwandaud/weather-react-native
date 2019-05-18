'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends Component {
  
  _renderItem = ({item}) => (
    <View style={styles.card}>
      <View>
          <Text style={styles.textBold}>
              {moment(item.dt_txt).format('DD MMMM YYYY, HH:mm A')}
          </Text>
          <Text>
              {item.main.temp_min.toFixed(0)} - {item.main.temp_max.toFixed(0)}
          </Text>
          <Text style={styles.textGrey}>
             {item.weather[0].main}
          </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon 
          name="chevron-right" 
          size={20} 
          color="#f44336" 
        />
      </View>
    </View>
  );

  render() {
    const { list } = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this._renderItem}
      />    
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1, 
    borderColor: '#d3d3d3', 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textBold: {
    fontWeight: 'bold'
  },
  textGrey: {
    color: 'grey'
  },
  iconContainer: {
    justifyContent: 'center', 
    alignSelf: 'center'
  }
});


export default ListItem;
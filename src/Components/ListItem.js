'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR, GREY_COLOR } from '../Helpers/Colors';
import { DEFAULT_FONT_REGULAR, DEFAULT_FONT_BOLD, DEFAULT_FONT_LIGHT } from '../Helpers/Fonts';

class ListItem extends Component {
  
  _renderItem = ({item, index}) => (

    <TouchableOpacity style={styles.card} onPress={() => this.props.onPress(index)}>
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
          color={PRIMARY_COLOR} 
        />
      </View>
    </TouchableOpacity>
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
    borderColor: GREY_COLOR, 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textBold: {
    fontFamily: DEFAULT_FONT_BOLD,
  },
  text: {
    fontFamily: DEFAULT_FONT_REGULAR,
  },
  textGrey: {
    fontFamily: DEFAULT_FONT_LIGHT,
    color: GREY_COLOR,
  },
  iconContainer: {
    justifyContent: 'center', 
    alignSelf: 'center'
  }
});


export default ListItem;
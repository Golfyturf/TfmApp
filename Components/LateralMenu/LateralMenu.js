import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class MenuDrawer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex : 0, backgroundColor : 'rgba(2,127,1,0.8)'}} /> 
        <View style = {styles.header}>
            <Text style={styles.name}></Text>
        </View>
        <View style = {styles.body}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    position: 'relative',
    height: '100%'
  },
  header:{
    flex:1,
    backgroundColor:'blue'
  },
  body:{
    flex:3,
    backgroundColor:'red'
  }
});

export default withNavigation(MenuDrawer);
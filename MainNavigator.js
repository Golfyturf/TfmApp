import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home'
import PayMentInfo from './Components/PaymentInfo/Payment.js'
const WIDTH = Dimensions.get('window').width;




const MainNavigator = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  HomeScreen:{
    screen:Home,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  PayInfo:{
    screen:PayMentInfo
  }
});

const App = createAppContainer(MainNavigator);
export default App;

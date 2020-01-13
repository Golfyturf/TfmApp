import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Components/Login/Login';

const WIDTH = Dimensions.get('window').width;




const MainNavigator = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const App = createAppContainer(MainNavigator);
export default App;

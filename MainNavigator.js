import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AddCreditCard from './Components/AddCreditCard/AddCreditCard';
import CreditCardList from './Components/CreditCardList/CreditCardList';
import SplashScreen from './Components/Login/SplashScreen.js';
import Home from './Components/Home/Home';
import LateralMenu from './Components/LateralMenu/LateralMenu.js';
import PayMentInfo from './Components/PaymentInfo/Payment.js';
import { createDrawerNavigator } from 'react-navigation-drawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({ navigation }) => {
    return <LateralMenu />;
  },
};

const DrawerNavigator = createDrawerNavigator(
  {
    Hometex: {
      screen: Home,
      navigationOptions: {
        disableGestures: true,
        header: null,
      },
    }
  },
  DrawerConfig,
);


const MainNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    },
  },
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
    screen:DrawerNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  PayInfo:{
    screen:PayMentInfo,
    navigationOptions: {
      header: null
    },
  },
  AddCreditCard: {
    screen: AddCreditCard
  },
  CreditCardList: {
    screen: CreditCardList
  }
});

const App = createAppContainer(MainNavigator);
export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Login from './Components/Login/Login';

import MainNavigator from './MainNavigator';
const App: () => React$Node = () => {
  return (
    <>
      <MainNavigator/>
    </>
  );
};



export default App;

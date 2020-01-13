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

import Login from './Components/Login/Login'
const App: () => React$Node = () => {
  return (
    <>
      <Login></Login>
    </>
  );
};



export default App;

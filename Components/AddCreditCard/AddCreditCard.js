import React, {Component} from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import logo from '../../assets/images/logo_gyt.png';
import ball from '../../assets/images/golfBall3.png';
import field from '../../assets/images/golf-field-png.png';
import Axios from 'axios';



const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number: '',
        cvc: '',
        date: ''
    };
  }

  render() {
    return (    
      <View style={styles.loginContainer}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.scrollView}>

                <View style={styles.cardContainer}>


                </View>

          </ScrollView>
      </View>  
    );
  }

}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "black",
        width: WIDTH * 0.9,
        height: HEIGHT * 0.3
    }

});

export default LogIn;

import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
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

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import firebase from '../../Instances/FireBase.js'

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSigninInProgress: false  
    };
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile']
    });
    this._retrieveData(props.navigation)
  }

  signIn = async (navigation) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      var NewUser  = new FormData();
      NewUser.append('name',userInfo.user.givenName);
      NewUser.append('lastName',userInfo.user.familyName);
      NewUser.append('user',userInfo.user.email);
      NewUser.append('photo',userInfo.user.photo); 

    const headers = {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
    }

    Axios.post('https://golfyturf.com/tfmApp/AppWebServices/createUser.php',NewUser,headers).then((response) => {
      if(response.data.userAlreadyRegistered === true)
      {
          this._storeData(userInfo.user)
          navigation.navigate('HomeScreen')
      }
      else
      {
        if(response.data.validation == true)
        {

        }
        else
        {

        }
      }
      }).catch((error) => {
        console.log(error)
      })

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('1')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('2')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('3')
      } else {
        console.log(error)
      }
    }
  };

  _storeData = async (user_data) => {
    try {
      await AsyncStorage.setItem('user', user_data.email);
      await AsyncStorage.setItem('nameUser', user_data.givenName);
      await AsyncStorage.setItem('photo', user_data.photo);
    } catch (error) {
      console.log("error store data")
      console.log(error)
    }
  };

 
  _retrieveData = async (navigation) => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        navigation.navigate('HomeScreen')
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  };

  updateUserSignUpInfo = (event, type) => {
    var updatedUserSignUpInfo = {
      ...this.state,
    };

    updatedUserSignUpInfo[type] = event;

    this.setState({
      email: updatedUserSignUpInfo.email,
      password: updatedUserSignUpInfo.password,
    });
  };


  render() {
    return (    
      <View style={styles.loginContainer}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.scrollView}>
              <View style={styles.logoContainer}>
                <Image
                  source={ball}
                  style={styles.backgroundContainer}
                />
                <Image
                  source={logo}
                  style={styles.logo}
                />
              </View>
              <GoogleSigninButton
                    style={styles.GoogleButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={() => this.signIn(this.props.navigation)}
                    disabled={this.state.isSigninInProgress} />
              <Image
                source={field}
                style={styles.backgroundBottom}
              />
          </ScrollView>
      </View>  
    );
  }
}


const styles = StyleSheet.create({
  loginContainer:{
    width: WIDTH,
    height: HEIGHT,
  },
  backgroundBottom:{
    position: "absolute",
    bottom: 0,
    height: HEIGHT * 0.3
  },
  backgroundContainer:{
    width: WIDTH * 0.9,
    height: '45%',
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
    opacity: 0.5
  },
  logoContainer: {
    height: HEIGHT * 0.5,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WIDTH * 0
  }, 
  logo: {
    marginTop: sizeH * 5,
    width: '55%',
    height: '50%',
    alignSelf: 'center'
  },
  scrollView: {
    backgroundColor: '#e2e2e2',
  },
  GoogleButton:{
    width: sizeW * 80, 
    height: sizeH * 5,
    alignSelf:'center',
    marginTop:sizeH * 12,
    borderRadius: 20,
    zIndex: 4
  }
});

export default LogIn;

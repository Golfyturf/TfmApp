import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Image,
    Dimensions,
} from 'react-native';
import logo from '../../assets/images/logo-GyTSplash.png';
import Axios from 'axios'
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSigninInProgress: false  
    };
    this.OpenLoading()
  }
  OpenLoading=()=>{
    
    setTimeout( () => {
        this._retrieveData();
     },1000);

    }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const idUser = await AsyncStorage.getItem('idUser');
      if (value !== null && idUser !== null) {
        
        var User = new FormData();
        User.append('idUser',idUser);
        User.append('mailUser',value);
        

        const headers = {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
        
          
          Axios.post('https://golfyturf.com/tfmApp/AppWebServices/getLastService.php',User,headers)
          .then((response) => {
                if(response.data.validation == true)
                {
                  switch (response.data.state) {
                    case "1":
                        this.props.navigation.navigate('HomeScreen',{
                            hours: response.data.hours,
                            days: response.data.days,
                          })
                      break;
                      case "2":
                        this.props.navigation.navigate('PayInfo')
                      break;
                      default:
                        this.props.navigation.navigate('Home')
                      break;
                  }
                }
              }).catch((error) => {
                console.log("Error Consultando el ultimo Servicio")
                console.log(error)
              })
      }
      else{
        this.props.navigation.navigate('Home')
      }
      
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  };


  render() {
    return (    
      <View style={styles.Container}>
          <Image
                  source={logo}
                  style={styles.logo}
                />
                <ActivityIndicator size={90} color = {'white'}xx/>
      </View>  
    );
  }
}


const styles = StyleSheet.create({
Container:{
    width: WIDTH,
    height: HEIGHT,
    backgroundColor:'rgba(2,127,1,1)',
    paddingTop:sizeH * 20
  }, 
logo: {
    width: sizeW * 90,
    height: sizeH * 40,
    alignSelf: 'center',
    marginBottom:sizeH * 20
  }
});

export default SplashScreen;

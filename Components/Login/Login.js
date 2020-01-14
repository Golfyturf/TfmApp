import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import logo from '../../assets/images/logo_gyt.png';
import ball from '../../assets/images/golfBall3.png';

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

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
              <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.userTextInput}
                    placeholder={'Correo'}
                    placeholderTextColor="#454A4D"
                    underlineColorAndroid="transparent"
                    value={this.state.email}
                    onChangeText={event =>
                      this.updateUserSignUpInfo(event, 'email')
                    }
                    maxLength={40}
                  />
                  
                  <TextInput
                    style={styles.userTextInput}
                    placeholder={'Contraseña'}
                    secureTextEntry={true}
                    placeholderTextColor="#454A4D"
                    underlineColorAndroid="transparent"
                    value={this.state.password}
                    onChangeText={event =>
                      this.updateUserSignUpInfo(event, 'password')
                    }
                    maxLength={40}
                  />
                <TouchableOpacity style={styles.loginButton}
                  onPress={() => this.login(this.props.navigation)}>
                  <Text style={styles.loginTextButton}>
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>{}}>
                  <Text style={styles.forgetPss}>
                    ¿Has olvidado tu contraseña?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Register')}}>
                  <Text style={styles.registrateBtn}>
                    ¿No tienes cuenta? Regístrate
                  </Text>
                </TouchableOpacity>
              </View>
          </ScrollView>
      </View>  
    );
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log("error getr")
      console.log(error)
    }
  };

  _storeData = async (user_data) => {
    try {
      await AsyncStorage.setItem('user', user_data.user, ()=>this._retrieveData('user'));
      await AsyncStorage.setItem('idUser', user_data.idUser, ()=> this._retrieveData('idUser'));
    } catch (error) {
      console.log("error")
      console.log(error)
    }
  };

  login = (navigation) =>{
    navigation.navigate('HomeScreen');
    /*
    
    var bodyFormData = new FormData();
    bodyFormData.append('user', this.state.email);
    bodyFormData.append('password', this.state.password);    

    const headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
    }

    axios.post("https://golfyturf.com/tfmApp/AppWebServices/checkLogin.php",
        bodyFormData,
        headers)
    .then(response =>{
        var user_data = response.data;
        this._storeData(user_data);
        if(user_data.validation === true)
        {
          navigation.navigate('HomeScreen');
        }

        
    })
    .catch((error) => {
        console.log("error axios")
        console.log(error)
        var errorMessage = error.message;
        dispatch(saveError(errorMessage));
        dispatch(endLoading());
    })
    */
  }


}


const styles = StyleSheet.create({
  loginContainer:{
    width: WIDTH,
    height: HEIGHT,
  },
  backgroundContainer:{
    width: WIDTH * 0.9,
    height: '45%',
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
    opacity: 0.5
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    height: HEIGHT * 0.5,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WIDTH * 0
  }, 
  logo: {
    marginTop: 20,
    width: '55%',
    height: '50%',
    alignSelf: 'center',
    padding: 0,
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  Icon: {
    padding: 10,
  },
  LockIcon: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
  },
  userTextInput: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    width: WIDTH*0.8,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    color: 'black',
    borderColor: '#027f01',
    paddingLeft: 10,
    fontSize: 17,
  },
  textImg: {
    width: 350,
    height: 120,
  },
  text: {
    color: '#000000',
    fontSize: 40,
    marginTop: 5,
    fontFamily: 'Roboto',
  },
  body: {
    backgroundColor: '#FFFDE7',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  forgetPss: {
    textAlign: 'center',
    fontSize: 15,
    color: '#454A4D',
    marginTop: 10,
  },
  loginButton: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    width: WIDTH*0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#027f01',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, 
    marginBottom: 20,
  },
  loginTextButton: {
    fontSize: 17,
    color: '#ffffff',
  },
  registrateBtn: {
    textAlign: 'center',
    fontSize: 15,
    color: '#454A4D',
    marginTop: 30,
  },
});

export default LogIn;

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const HEIGHT = Math.round(Dimensions.get('window').height);

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
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.parteArriba}>
            <ImageBackground
              source={null}
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.parteArribaImagen}
            />
          </View>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
            style={styles.scrollView}>
            <View style={styles.parteAbajo}>
              <View style={styles.inputContainer}>
                <View style={styles.inputSection}>
                  
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
                </View>
                <View style={styles.inputSection}>
                  
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
                </View>
                <TouchableOpacity
                  onPress={() =>{}
                  }>
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  parteArriba: {
    backgroundColor: '#FFFFFF',
    height: HEIGHT * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parteArribaImagen: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  parteAbajo: {
    marginTop: '20%',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: 30,
    // eslint-disable-next-line no-dupe-keys
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  logo: {
    width: 105,
    height: 105,
  },
  inputSection: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    width: WIDTH - 30,
    borderRadius: 10,
    color: '#454A4D',
    borderColor: '#454A4D',
    borderWidth: 2,
    marginBottom: 10,
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
    color: 'black',
    height: 50,
    width: WIDTH - 100,
    // borderColor: '#454A4D',
    paddingLeft: 25,
    fontSize: 17,
    marginBottom: 30,
    // borderRadius: 10,
    // color: '#454A4D',
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
    width: WIDTH - 55,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffc326',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  loginTextButton: {
    fontSize: 17,
    color: '#000000',
  },
  registrateBtn: {
    textAlign: 'center',
    fontSize: 15,
    color: '#454A4D',
    marginTop: 30,
  },
});

export default LogIn;

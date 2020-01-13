import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: {
        Name: '',
        LastName: '',
        UserName: '',
        Password: '',
        IdClub: ''
      }
    };
  }

  updateUserSignUpInfo = (event, type) => {
    let newUser = {
      ...this.state.User,
    };

    newUser[type] = event;

    this.setState({
      User: newUser
    });
    console.log(this.state.User)
  };
  
  handlerRegister(navigation){
     
    var NewUser  = new FormData();
    NewUser.append('name',this.state.User.Name)
    NewUser.append('password',this.state.User.Password)
    NewUser.append('user',this.state.User.UserName)
    NewUser.append('lastName',this.state.User.LastName)
    NewUser.append('idClub',this.state.User.IdClub)

    const headers = {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
    }

    axios.post('https://golfyturf.com/tfmApp/AppWebServices/createUser.php',NewUser,headers).then((response) => {
      alert(response.data.message)
      if(response.data.validation)
      {
        navigation.navigate('HomeScreen')
      }
    }
    ).catch((error) => {
      console.error(error)
    })
  }


  render() {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView
            contentContainerStyle={{flexGrow: 1, padding: 30}}>  
          <View style={styles.wrapperView}>
            <Text style={styles.title}>Registro</Text>
          </View>
          <TextInput
            style={styles.userTextInput}
            placeholder={'Nombre'}
            placeholderTextColor="#454A4D"
            underlineColorAndroid="transparent"
            value={this.state.User.Name}
            onChangeText={event =>
              this.updateUserSignUpInfo(event, 'Name')
            }
            maxLength={40}
          />
           <TextInput
            style={styles.userTextInput}
            placeholder={'Apellido'}
            placeholderTextColor="#454A4D"
            underlineColorAndroid="transparent"
            value={this.state.User.LastName}
            onChangeText={event =>
              this.updateUserSignUpInfo(event, 'LastName')
            }
            maxLength={40}
          />
           <TextInput
            style={styles.userTextInput}
            placeholder={'Nombre de usuario'}
            placeholderTextColor="#454A4D"
            underlineColorAndroid="transparent"
            value={this.state.User.UserName}
            onChangeText={event =>
              this.updateUserSignUpInfo(event, 'UserName')
            }
            maxLength={40}
          />
           <TextInput
            style={styles.userTextInput}
            placeholder={'Contraseña'}
            placeholderTextColor="#454A4D"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={this.state.User.Password}
            onChangeText={event =>
              this.updateUserSignUpInfo(event, 'Password')
            }
            maxLength={40}
          />
           <TextInput
            style={styles.userTextInput}
            placeholder={'Club al que pertenece'}
            placeholderTextColor="#454A4D"
            underlineColorAndroid="transparent"
            value={this.state.User.IdClub}
            onChangeText={event =>
              this.updateUserSignUpInfo(event, 'IdClub')
            }
            maxLength={40}
          />
          <TouchableOpacity 
            style={styles.RegisterButtom}
            onPress={() => this.handlerRegister(this.props.navigation)}>
            <Text style={{color:'white'}}>
              Registrar
            </Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    width:WIDTH,
    height:HEIGHT,
    justifyContent:'center'
  },
  wrapperView:{
    borderBottomColor:'#027f01',
    borderBottomWidth:2,
    marginBottom:50,
    borderRadius:50
  },
  title:{
    color:'black',
    fontSize:50,
    borderBottomWidth:2,
    borderColor:'#027f01',
    alignSelf:'center'
  },
  userTextInput: {
    borderRadius:10,
    color: 'black',
    height: 50,
    borderWidth:2,
    borderColor:'#027f01',
    width: WIDTH - 40,
    paddingLeft: 25,
    fontSize: 17,
    marginBottom: 30,
    alignSelf:'center'
  },
  RegisterButtom:{
    borderRadius:10,
    backgroundColor:'#027f01',
    width: WIDTH * 0.5,
    height: 50,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'

  }
});

export default LogIn;
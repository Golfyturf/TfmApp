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
  ActionSheetIOS,
   Picker
} from 'react-native';
import Axios from 'axios'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clubs:[],
      User: {
        Name: '',
        LastName: '',
        UserName: '',
        Password: '',
        IdClub: '',
        ClubName:'Seleccione el club al cual pertenece'
      }
    };
    this.fetchData()
  }
  fetchData(){
    Axios.get('https://golfyturf.com/tfmApp/AppWebServices/getClients.php').then(
      (response) => {
        this.setState({
          Clubs:response.data
        })
      }
    )

  }

  updateUserSignUpInfo = (event, type) => {
    let newUser = {
      ...this.state.User,
    };
    newUser[type] = event;
    this.setState({
      User: newUser
    });
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

    Axios.post('https://golfyturf.com/tfmApp/AppWebServices/createUser.php',NewUser,headers).then((response) => {
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

  showActionSheetClub = () => {
    var BUTTONS = this.state.Clubs.map((item) => {
      return item.Nombre_completo
    });
    
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
    },
      (buttonIndex) => {
        this.updateUserSignUpInfo(this.state.Clubs[buttonIndex].Nombre_completo, 'ClubName')
        this.updateUserSignUpInfo(this.state.Clubs[buttonIndex].Id, 'IdClub')
      });
  };

  belongsClub() {
    let androidPicker = (
      <View style={styles.pickerSelectionSection}>
        <Picker
          selectedValue={this.state.User.ClubName}
          onValueChange={itemValue =>
            this.updateUserSignUpInfo(itemValue, 'IdClub')
          }>
            <Picker.Item label="Seleccione el club al que pertenece" value="0" />
          {this.state.Clubs.map((item) => {
            return (
              <Picker.Item label= {item.Nombre_completo} value={item.Id} />
            )
          })}
        </Picker>
      </View>
    );

    if (Platform.OS === 'ios') {

      return (
      <TouchableOpacity onPress={this.showActionSheetClub} style={styles.pickerSelectionSection}>
        <Text style={{ color: 'black', fontSize: 15,}}>{this.state.User.ClubName}</Text>
      </TouchableOpacity>)
    } else {
      return androidPicker;
    }
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
           {this.belongsClub()}
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
  pickerSelectionSection:{
    borderRadius:10,
    color: 'black',
    height: 50,
    borderWidth:2,
    borderColor:'#027f01',
    width: WIDTH - 40,
    paddingLeft: 25,
    fontSize: 17,
    marginBottom: 30,
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center'
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
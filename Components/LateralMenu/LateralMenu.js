import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logOut from '../../assets/images/logout.png';
import creditCards from '../../assets/images/creditCards.png';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        user:'',
        nameUser:'Holaaaaaa',
        photo: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
      }
    };
    this.getUserInfo()
}

getUserInfo = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const nameUser = await AsyncStorage.getItem('nameUser');
    let photo = await AsyncStorage.getItem('photo');
    if(photo === null){
      photo = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }
    const UserInfo = {
      user,
      nameUser,
      photo
    }

    if (UserInfo !== null) {
      this.setState({
        user: UserInfo
      })
    }
  } catch (error) {
    // Error retrieving data
    console.log(error)
  }
};

logOutMethod = async () =>{
  try {
          await AsyncStorage.clear().then(response => {
            this.props.navigation.navigate('Home')
          });
    } catch (error) {
      console.log("error clear store data")
      console.log(error)
  }
}


  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex : 0, backgroundColor : 'rgba(2,127,1,0.8)'}} /> 
        <View style = {styles.header}>
            <Image
                  source={{uri:this.state.user.photo}}
                  style={styles.profileImage}
                />
            <Text style={styles.user}>{this.state.user.user}</Text>
            <Text style={styles.userName}>{this.state.user.nameUser}</Text>
        </View>
        <View style = {styles.body}>
        <TouchableOpacity style = {styles.opcion}>
            <Image
                  source={logOut}
                  style={styles.iconOpcion}
                />
            <Text style={styles.opcionText}>Cerrar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.opcion}
            onPress = {() => this.props.navigation.navigate('CreditCardList')}>
            <Image
                  source={creditCards}
                  style={styles.iconOpcion}
                />
            <Text style={styles.opcionText}>Mis tarjetas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style = {styles.opcion}
            onPress={() =>  this.logOutMethod()}>
            <Image
                  source={logOut}
                  style={styles.iconOpcion}
                />
            <Text style={styles.opcionText}>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    position: 'relative',
    height: '100%'
  },
  header:{
    flex:1,
    backgroundColor:'rgba(2,127,1,0.8)',
    alignItems:'center',
    justifyContent:'center'
  },
  body:{
    flex:3,
    backgroundColor:'white'
  },
  user:{
    fontSize: sizeW * 5,
    color:'white'
  },
  userName:{
    fontSize: sizeW * 4,
    color:'white'
  },
  profileImage:{
    width: sizeW * 25,
    height:sizeW * 25,
    borderRadius: sizeW * 50,
    marginBottom: sizeH * 2
  },
  opcion:{
    flexDirection:'row',
    height:sizeH * 4,
    marginVertical: sizeH * 1,
    alignItems:'center',
    padding:sizeW * 2
  },
  opcionText:{
    fontSize:sizeW * 4,
    color:'black'
  },
  iconOpcion:{
    width:sizeW * 6,
    height:sizeW * 6,
    margin:sizeW * 5
  }
});

export default withNavigation(MenuDrawer);
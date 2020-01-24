import React, {Component} from 'react';
import axios from 'axios';
import {AsyncStorage, KeyboardAvoidingView} from 'react-native';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import logo from '../../assets/images/logo_gyt.png';
import ball from '../../assets/images/golfBall3.png';
import field from '../../assets/images/golf-field-png.png';
import Axios from 'axios';
import { CreditCardInput } from "react-native-credit-card-input";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'



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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
        return false;
    });
  }

  render() {
    return (    
      
          <ScrollView
            contentContainerStyle={{flexGrow: 1,}}
            style={styles.scrollView}>
            <Text style={styles.tittle}>Añadir medio de pago</Text>
            <View style={styles.cardContainer}>
                <CreditCardInput  labels={{ number: "Numero", expiry: "Fecha", cvc: "CVC/CCV" }} allowScroll={true} onChange={this._onChange} />
            </View>
            <TouchableOpacity 
                style={styles.addCardButton}
                onPress={() => console.log("p")}>
                <Text style={{fontSize: 20,color:'white'}}>
                    Guardar
                </Text>
            </TouchableOpacity>
          </ScrollView>
      
    );
  }

  _onChange = form => console.log(form);

}


const styles = StyleSheet.create({
    tittle:{ 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'black', 
        alignSelf: 'center',
        marginTop: HEIGHT * 0.02
    },
    cardContainer: {
        marginTop: HEIGHT * 0.1
    },
    addCardButton:{
        backgroundColor:'#027f01',
        width: WIDTH,
        height: 50,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        position: "absolute",
        bottom: 60
    }

});

export default LogIn;

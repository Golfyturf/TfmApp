import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'



const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class AddCreditCard extends Component {
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
      
          <ScrollView
            contentContainerStyle={{flexGrow: 1,}}
            style={styles.scrollView}>
            <Text style={styles.tittle}>Añadir método de pago</Text>
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

  _onChange = form => {
      this.setState({
          ...form.values
      })
      console.log(this.state);
  };
    

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

export default AddCreditCard;

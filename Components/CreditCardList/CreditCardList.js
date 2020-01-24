import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import visa from '../../assets/images/visa.png';
import master from '../../assets/images/master-card.png';
import other from '../../assets/images/otherCreditCard.png';
import deleteCard from '../../assets/images/deleteCard.png';

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class CreditCardList extends Component {
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
        
        <View style={styles.creditCardListContainer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1,}}
              style={styles.scrollView}>
              <Text style={styles.tittle}>Métodos de pago</Text>
              <FlatList 
                    data={[
                      {number: '411111******1111'},
                      {number: '511111******1111'},
                      {number: '21111******1111'},
                      {number: '422222******1111'}
                    ]}
                    renderItem={({item}) => <CreditCardListItem key={item.number} number={item.number} />}
              />
            </ScrollView>
            <TouchableOpacity 
                style={styles.addCardButton}
                onPress={() => this.props.navigation.navigate('AddCreditCard')}>
                <Text style={{fontSize: 40, position: "relative", bottom: 3, textAlign: "center",color:'white'}}>
                    +
                </Text>
               </TouchableOpacity>
        </View>
            
        
      );
    }
  }

class CreditCardListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (    
        <View style={styles.cardListItemContainer}>
            <Image
                  source={this.getCreditCardIcon()}
                  style={styles.cardIcon}
            />
            <Text style={styles.cardNumber}>{this.props.number}</Text>
            <TouchableOpacity 
                onPress={() => console.log("p")}
                style={{flex: 1.5}}
                >
                <Image 
                  source={deleteCard}
                  style={styles.deleteCard}
                />
            </TouchableOpacity>
           
            
        </View>
      
    );
  }

  getCreditCardIcon = () => {
      console.log(this.props.number[0])
      if(this.props.number[0] === "4"){
          return visa
      }else if(this.props.number[0] === "5"){
          return master
      }else{return other}
  }

}


const styles = StyleSheet.create({
    creditCardListContainer: {
        width: WIDTH,
        height: HEIGHT * 0.9
    },
    addCardButton:{
        width: WIDTH * 0.15,
        height: WIDTH * 0.15,
        position: "absolute",
        bottom: HEIGHT * 0.05,
        zIndex: 0,
        right: WIDTH * 0.05,
        backgroundColor: "rgba(2,127,1,0.8)",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteCard:{
        width: WIDTH * 0.05,
        height: HEIGHT * 0.05,
        resizeMode: "contain",
    },
    cardIcon: {
        height: HEIGHT * 0.2,
        resizeMode: "contain",
        marginHorizontal: 10,
        flex: 1
        
    },
    cardListItemContainer: {
        flexDirection: "row",
        borderColor: "#b3b3b3",   
        borderBottomWidth: 1,      
        height: HEIGHT * 0.08,
        alignItems: "center",
        width: WIDTH
    },
    tittle:{ 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'black', 
        alignSelf: 'center',
        marginTop: HEIGHT * 0.02,
        marginBottom: 20
    },
    cardNumber: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: 'black', 
        alignSelf: 'center',
        flex: 8
    }

});

export default CreditCardList;

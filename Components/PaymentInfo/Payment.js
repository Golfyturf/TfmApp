import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions,
    Picker,
    Text,
    TouchableOpacity,
    ActionSheetIOS
} from 'react-native';
import React from 'react';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100;
class PaymentInfo extends React.Component {

    constructor(props) {
        super(props);
        this.markers = []
        this.mounted = false;
        this.state = {
            itemSelected: props.itemSelected,
            markerObjects: [],
            CreditCards: ["422323", "34343"],
            User: {
                Name: '',
                LastName: '',
                UserName: '',
                Password: '',
                IdCreditCard: '',
                CreditCard:'Seleccione Tarjeta para el pago'
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
      };

    showActionSheetClub = () => {
        
        ActionSheetIOS.showActionSheetWithOptions({
          options: this.state.CreditCards,
        },
          (buttonIndex) => {
            this.updateUserSignUpInfo(this.state.CreditCards[buttonIndex], 'CreditCard')
          });
      };

    belongsClub() {
        let androidPicker = (
            <View style={styles.pickerSelectionSection}>
                <Picker
                    itemStyle={styles.itemStyle}
                    selectedValue={this.state.User.IdCreditCard}
                    onValueChange={itemValue =>
                        this.updateUserSignUpInfo(itemValue, 'IdCreditCard')
                    }>
                    <Picker.Item label="Seleccione Tarjeta para el pago" value="0" color={'#2896F6'} />
                    <Picker.Item label={"24424242424242"} value={1} color={'#2896F6'} />

                    <Picker.Item label={"22222******"} value={2} color={'#2896F6'}/>

                    <Picker.Item label={"*********3434"} value={3} color={'#2896F6'} />
                </Picker>
            </View>
        );

        if (Platform.OS === 'ios') {

            return (
                <TouchableOpacity onPress={this.showActionSheetClub} style={styles.pickerSelectionSection}>
                    <Text style={{ color: '#2896F6', fontSize: 15, }}>{this.state.User.CreditCard}</Text>
                </TouchableOpacity>)
        } else {
            return androidPicker;
        }
    }



    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.topBox}>

                </View>
                <View style={styles.carInfo} >
                    <View style={styles.carDetails} >
                        <Text style={{ fontSize: sizeW * 5, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center', marginBottom: 20 }}>Información del pago</Text>
                        <Text style={styles.dataTitle}>{'Vehiculo usado:'}</Text>
                        <Text style={styles.data}>{'RXB Elite'}</Text>
                        <Text style={styles.dataTitle}>{'Tiempo del servicio:'}</Text>
                        <Text style={styles.data}>{'4Hr  20Min'}</Text>
                        <Text style={styles.dataTitle}>{'Tipo pago:'}</Text>
                        {this.belongsClub()}
                    </View>
                </View>
                <View style={styles.payInfo}>
                    <View style={styles.totalSection}>
                        <Text style={{ fontSize: sizeW * 6, fontWeight: 'bold', color: '#35556F' }}>{"Total:"}</Text>
                        <Text style={{ fontSize: sizeW * 7, fontWeight: 'bold', color: '#2896F6' }}>{'$14,500'}</Text>
                    </View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => { }}>
                        <Text style={styles.loginTextButton}>
                            Pagar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: sizeW * 8,
        paddingTop: HEIGHT / 6
    },
    totalSection: {
        flex: 1,
        alignItems: 'center'
    },
    topBox: {
        width: WIDTH,
        height: HEIGHT / 4,
        backgroundColor: '#027f0150',
        position: "absolute",
        top: 0,
        borderBottomStartRadius: WIDTH / 5,
        borderBottomEndRadius: WIDTH / 5
    },
    itemStyle:{
        backgroundColor:'#027f01',
        borderWidth:1,
        borderColor:'#027f01'
    },
    dataTitle: {
        fontSize: sizeW * 4,
        fontWeight: 'bold',
        color: '#35556F',
        marginBottom:sizeH
    },
    data: {
        fontSize: sizeW * 6,
        fontWeight: 'bold',
        color: '#2896F6',
        marginBottom: sizeH  * 5,
    },
    carInfo: {
        height: HEIGHT / 2,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 30,
    },
    pickerSelectionSection:{
      borderRadius:30,
      color: '#2896F6',
      height: sizeH * 6,
      borderWidth:2,
      borderColor:'#2896F6',
      width: sizeW * 70,
      paddingLeft: sizeW * 4,
      fontSize: sizeW * 5,
      marginBottom: sizeH  * 5,
      alignSelf:'center',
      alignContent:'center',
      justifyContent:'center'
    },
    carImg: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    carDetails: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: '#E1E5EB',
        padding: sizeW * 9,
        alignItems: 'center',
        //Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 19,

    },
    payInfo: {
        height: HEIGHT / 7,
        flexDirection: 'row',
        width: WIDTH,
        paddingHorizontal: sizeW * 8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#E1E5EB',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    loginButton: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        width: WIDTH * 0.4,
        height: sizeH * 5,
        borderRadius: 10,
        backgroundColor: '#027f01',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 18,
        color: '#ffffff',
    },
});
export default PaymentInfo;
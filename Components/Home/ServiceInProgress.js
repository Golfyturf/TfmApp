import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import React from 'react';


import QRicon from '../../assets/images/qrIcon.png';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

_interval: null;

class ServiceInProgress extends React.Component {

    constructor(props) {
        super(props);
        this.markers = []
        this.mounted = false;
        this.state = {
            hours: props.hours,
            second: props.seconds,
            minutes: props.minutes,
            itemSelected: props.itemSelected,
            markerObjects: [],
        };
        this.onStart()
    }

    onStart = () => {
        this._interval = setInterval(() => {
        if(this.state.second === 59)
        {
            if(this.state.minutes === 59)
            {
                this.setState({
                    second: 0,
                    minutes: 0,
                    hours: this.state.hours + 1
                 })
            }
            else
            {
                this.setState({
                    second: 0,
                    minutes: this.state.minutes + 1
                 })
            }
            
        }
        else{
            if(this.state.minutes === 59)
            {
                this.setState({
                    second: this.state.second + 1,
                    minutes: 0,
                    hours: this.state.hours + 1
                 })
            }
            else
            {
                this.setState({
                    second: this.state.second + 1
                 })
            }
        }
     }, 1000);
    }

    getTime(){
        if(this.state.hours < 10)
        {
            if(this.state.minutes < 10)
            {
                if(this.state.second < 10)
                {
                    return "0" + this.state.hours +  ":0" + this.state.minutes + ":0" + this.state.second 
                }
                else
                {
                    return "0" + this.state.hours +  ":0" + this.state.minutes + ":" + this.state.second 
                }
            }
            else
            {
                if(this.state.second < 10)
                {
                    return "0" + this.state.hours +  ":" + this.state.minutes + ":0" + this.state.second 
                }
                else
                {
                    return "0" + this.state.hours +  ":" + this.state.minutes + ":" + this.state.second 
                }
            }
        }
        else{
            if(this.state.minutes < 10)
            {
                if(this.state.second < 10)
                {
                    return this.state.hours +  ":0" + this.state.minutes + ":0" + this.state.second 
                }
                else
                {
                    return  this.state.hours +  ":0" + this.state.minutes + ":" + this.state.second 
                }
            }
            else
            {
                if(this.state.second < 10)
                {
                    return this.state.hours +  ":" + this.state.minutes + ":0" + this.state.second 
                }
                else
                {
                    return this.state.hours +  ":" + this.state.minutes + ":" + this.state.second 
                }
            }

        }
        
        
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                    <View style={styles.carDetails} >
                        <Text style={{ fontSize: sizeW * 4, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center',marginBottom:20}}>Servicio Activado!</Text>
                        <Text style={{ fontSize: sizeW * 6, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center',marginBottom:20}}>{this.getTime()}</Text>

                        <Text style={{ fontSize: sizeW * 3, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center',marginBottom:20}}>{"Hora:Minutos:Segundos"}</Text>
                    </View>
                    <View style={styles.carDetails} >
                        <TouchableHighlight
                            style={styles.btnAcept}
                            onPress={() => { this.props.StopService()}}>
                                    <View style={styles.stopCircle} />
                        </TouchableHighlight>
                        <Text style={{ fontSize: sizeW * 3, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center',marginBottom:20}}>Terminar viaje</Text>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex:3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    btnAcept: {
        flexDirection:'column', 
        width: sizeH * 8, 
        height: sizeH * 8,
        backgroundColor: 'white',
        alignItems:'center',
        borderWidth:2,
        borderColor:'black',
        justifyContent:'center',
        margin:sizeW * 2,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10,
        elevation: 10   
      },
    backgroundContainer:{
        width: sizeW * 10,
        height: sizeW * 10
    },
    stopCircle:{
        backgroundColor:'black',
        width: sizeW * 4,
        height: sizeW * 4
    },
    carDetails: {
        flex: 4,
        height:'100%',
        paddingHorizontal: 15,
        alignItems:'center',
        justifyContent:'center',
        
    }
});
export default ServiceInProgress;
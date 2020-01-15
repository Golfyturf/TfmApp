import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text
} from 'react-native';
import React from 'react';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
class MyLocationMapMarker extends React.Component {

    constructor(props) {
        super(props);
        this.markers = []
        this.mounted = false;
        this.state = {
            itemSelected: props.itemSelected,
            markerObjects: []
        };
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style ={styles.carInfo} >
                    <View style ={styles.carImg} >
                        <Image style={{width: 200, height: 200}} source={{uri: 'https://golfyturf.com/feria_automovil/archivos/IMG-Actualizada-2_FIVE_EZGO-41.jpg'}}/>
                    </View>
                    <View style ={styles.carDetails} >
                        <Text style={{fontSize:19,fontWeight:'bold', color:'white'}}>Información</Text>
                        <Text style={{fontSize:16,fontWeight:'bold', color:'white',textAlign:'justify'}}>{'Tipo:'}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold', color:'white',textAlign:'justify'}}>{'Numero de Pasajeros:'}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold', color:'white',textAlign:'justify'}}>{'Velocidad'}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold', color:'white',textAlign:'justify'}}>{'Color:'}</Text>
                    </View>
                </View>
                <View style = {styles.payInfo}>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20
    },
    carInfo:{
        flex:1,
        flexDirection:'column',
        backgroundColor: 'red',
        marginBottom:15
    },
    carImg:{
        flex:5,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    carDetails:{
        flex:4,
        padding:4,
        alignItems:'center',
    },
    payInfo:{
        flex:1,
        flexDirection:'row',
        backgroundColor: 'red'
    }

});
export default MyLocationMapMarker;
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    BackHandler,
    TouchableOpacity
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
                <View style={styles.carInfo} >
                    <View style={styles.carImg} >
                        <Image style={{ width: WIDTH * 0.4, height: HEIGHT * 0.2 }} source={{ uri: 'https://golfyturf.com/feria_automovil/archivos/IMG-Actualizada-2_FIVE_EZGO-41.jpg' }} />
                    </View>
                    <View style={styles.carDetails} >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2896F6', alignSelf: 'center',marginBottom:20}}>Información</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#35556F', textAlign: 'justify' }}>{'Tipo:'}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#35556F', textAlign: 'justify' }}>{'Numero de Pasajeros:'}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#35556F', textAlign: 'justify' }}>{'Velocidad'}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#35556F', textAlign: 'justify' }}>{'Color:'}</Text>
                    </View>
                </View>
                <View style={styles.payInfo}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#35556F', marginBottom: 25 }}>Solo falta el pago</Text>
                    <Text style={{ fontSize: 39, fontWeight: 'bold', color: '#2896F6' }}>{'$14,500'}</Text>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => {}}>
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
        padding: 20
    },
    carInfo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1E5EB',
        marginBottom: 15,
        justifyContent:'center',
    },
    carImg: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    carDetails: {
        flex: 4,
        paddingHorizontal: 15,
        justifyContent:'center'
    },
    payInfo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E1E5EB',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:5
    },
    loginButton: {
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        width: WIDTH*0.5,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#027f01',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50, 
        marginBottom: 20,
    },
    loginTextButton: {
        fontSize: 18,
        color: '#ffffff',
    },
});
export default MyLocationMapMarker;
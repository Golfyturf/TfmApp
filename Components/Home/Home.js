import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    Linking,
    FlatList,
    ImageBackground,
    Modal
} from 'react-native';
import React from 'react';
import ViewPark from './ViewPark';
import RNLocation from 'react-native-location';
import Axios from 'axios';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
class MyLocationMapMarker extends React.Component {

    constructor(props) {
        super(props);
        this.markers = []
        this.mounted = false;
        this.state = {
            modalVisible: false,
            itemSelected: { id: 1, nombre: 'SAFASASA', dir: 'calle 130', coordinate: { latitude: 4.705585, longitude: -74.081431 } },
            region: null,
            parqueaderos: [],
            markerObjects: []
        };

        this.onMarkerMounted = element => {
            this.setState(prevState => ({
                markerObjects: [...prevState.markerObjects, element.marker]
            }))
        };
        this._getLocationAsync();

    }
    getKilometros = function(lat1,lon1,lat2,lon2)
    {
        rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d.toFixed(1); //Retorna tres decimales
    }

    _getLocationAsync = async () => {
        RNLocation.configure({
            distanceFilter: 1, // Meters
            desiredAccuracy: {
                ios: "bestForNavigation",
                android: "balancedPowerAccuracy"
            },
            // Android only
            androidProvider: "auto",
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 3000, // Milliseconds
            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to demo the library",
                    buttonPositive: "OK"
                }
            }
        }).then(granted => {
            if (granted) {
                this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    if (locations != null) {
                        const coor = {
                            latitude: locations[0].latitude,
                            longitude: locations[0].longitude
                        }
                        const uri = 'https://services.towy.com.co/api/UsuarioCliente/ObtenerTiendas?lat='
                        +coor.latitude+'&lon='+coor.longitude+'&tipoServicio='+ this.props.navigation.getParam('itemId', 'NO-ID');
                        let tiendas = []
                        Axios.get(uri).then((r) => {
                            
                            tiendas = r.data.listResponse.map((item) => {
                                const newV = {
                                    id: item.idTienda,
                                    nombre:item.nombre,
                                    dir:item.direccion,
                                    coordinate:{
                                        latitude:item.latitud,
                                        longitude:item.longitud
                                    },
                                    distance: this.getKilometros(coor.latitude,coor.longitude,
                                        item.latitud, item.longitud),
                                    desc:item.descripcion
                                }
                                return newV
                            })
                            this.setState({
                                parqueaderos: tiendas.sort(function (a, b) {
                                    if (a.distance > b.distance) {
                                      return 1;
                                    }
                                    if (a.distance < b.distance) {
                                      return -1;
                                    }
                                    // a must be equal to b
                                    return 0;
                                  })
                            })
                        }).catch((er) => {
                            console.log(er)
                        })
                        this.setState({
                            region: {
                                latitude: locations[0].latitude,
                                longitude: locations[0].longitude,
                                latitudeDelta: 0.019,
                                longitudeDelta: 0.019
                            }
                        })
                    }
                    else {
                        Alert.alert(
                            'Error',
                            'error al obtener información de la ubicación',
                            [
                                { text: 'OK', onPress: () => this.showAlert() },
                            ],
                            { cancelable: false },
                        );
                        this.setState({
                            region: {
                                latitude: 4.705276,
                                longitude: -74.081748,
                                latitudeDelta: 0.9,
                                longitudeDelta: 0.9
                            }
                        })
                    }

                })

            }
        }).catch((e) => {
            console.error('error')
        })
    }
    setModalVisible=(bol, item)=>{
       this.setState({
           ...this.state,
           itemSelected:item,
           modalVisible:bol
       })
    }

    onViewableItemsChanged = (item) => {
        const duration = 1000
        if (this.markers[item.id]) {
            this.markers[item.id].showCallout();
        }

        const region = {
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        };
        this.map.animateToRegion(region, duration)
        
    }
    openLink(lat,lon,opc){
        var url = ''
        if(opc ===2)
        {
             url = 'https://www.google.com/maps/dir/?api=1&origin='
                                                + this.state.region.latitude + ', '
                                                + this.state.region.longitude + '&destination='
                                                + lat + ', '
                                                + lon + '&travelmode=vehicle';
        }
        else
        {
             url = 'https://waze.com/ul?q=66%20Acacia%20Avenue&ll='
                                +lat+','+lon+'&navigate=yes';
        }
        
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Modal
                    //presentationStyle={'pageSheet'}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.modalcontainer}>
                        <ImageBackground source={null} style={{ width: '100%', height: '100%' }} />
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.columnleft}>
                                <TouchableOpacity
                                    style={[styles.backButton]}
                                    onPress={() => { this.setState({
                                        modalVisible:false
                                    }) }}>
                                   
                                </TouchableOpacity>
                            </View>
                            <View style={styles.columnright}>
                                <Text style={{ fontSize: 20 }}>
                                    {this.state.itemSelected.nombre}
                                </Text>
                                <Text style={{ fontSize: 15, opacity:0.5 }}>
                                    {this.state.itemSelected.dir}
                                </Text>
                                <Text style={{ fontSize: 15, opacity:0.5 }}>
                                    {this.state.itemSelected.desc}
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={styles.buttons}
                                        onPress={() => {
                                            this.openLink(
                                                this.state.itemSelected.coordinate.latitude,
                                                this.state.itemSelected.coordinate.longitude,
                                                1
                                                )}}>
                                        <Image style={{width:30,height:30}} source={null}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttons}
                                        onPress={() => {
                                            this.openLink(
                                                this.state.itemSelected.coordinate.latitude,
                                                this.state.itemSelected.coordinate.longitude,
                                                2
                                                )}}>
                                        <Image style={{width:30,height:30}}  source={null}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>           
                </Modal>
                <MapView // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    ref={(map) => { this.map = map }}
                    zoomEnabled={true}>
                    {
                        this.state.parqueaderos.map((par) => {
                            return (
                                <Marker
                                    image={marker}
                                    identifier={par.id.toString()}
                                    ref={(ref) => this.markers[par.id] = ref}
                                    key={par.id}
                                    coordinate={par.coordinate}>

                                    <Callout
                                        alphaHitTest
                                        tooltip
                                        style={styles.customView}
                                        onPress={() => this.setModalVisible(true,par)}>

                                        
                                    </Callout>
                                </Marker>)
                        })
                    }

                </MapView>
                <FlatList
                    style={styles.list}
                    data={this.state.parqueaderos}
                    ref={(ref) => this.listComercio = ref}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    scrollEnabled={true}
                    numColumns={1}
                    keyExtractor={item => { return item.id; }}
                    onScrollToIndexFailed={() => { console.log('error') }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <ViewPark data={item} animate={this.onViewableItemsChanged}>

                            </ViewPark>
                        )
                    }} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    map: {
        flex: 2
    },
    buttons:{
        flex:1,
        height:60,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    columnleft:{
        flex:0.2,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    columnright:{
        flex:1,
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center'
    },
    backButton: {
        zIndex: 9,
        width: 35,
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        alignItems: 'center'

    },
    calloutButton: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    cardParking: {
        flex: 1,
        width: WIDTH,
        backgroundColor: 'red',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    list: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#E6E5DF',
        alignSelf: 'center',
        marginBottom: WIDTH / 20
    },
    markerFixed: {
        left: '50%',
        marginLeft: -14,
        marginTop: -31,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 30,
        width: 30
    },
    modalcontainer: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        width: WIDTH,
        top: HEIGHT / 2,
        height: 300,
        paddingBottom: HEIGHT / 6
    }
});
export default MyLocationMapMarker;
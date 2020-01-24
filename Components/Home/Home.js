import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions,
    Linking,
    Text,
    SafeAreaView,
    Image
} from 'react-native';
import React from 'react';
import RNLocation from 'react-native-location';
import marker2 from '../../assets/images/golfmark.png';
import ModalQR from './ModalQR.js';
import CustomCallout from './CustomCallout.js';
import AsyncStorage from '@react-native-community/async-storage';

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 

class MyLocationMapMarker extends React.Component {

    constructor(props) {
        super(props);
        this.markers = []
        this.mounted = false;
        
        this.state = {
            modalVisible: false,
            statusBarHeight: 0,
            itemSelected: {id: 1, nombre:'TXT23', seating : 5},
            region: null,
            GolfCars: [
                {id: 1, nombre:'TXT23' , seating : 5},
                {id: 2, nombre:'TXT33', seating : 2},
                {id: 3, nombre:'TXT33', seating : 2 },
                {id: 4, nombre:'TXT23' , seating : 3},
                {id: 5, nombre:'TXT23' , seating : 2},
                {id: 6, nombre:'TXT23', seating : 3},

            ],
            markerObjects: []
        };

        this.onMarkerMounted = element => {
            this.setState(prevState => ({
                markerObjects: [...prevState.markerObjects, element.marker]
            }))
        };
        this._getLocationAsync();
    }
    
    UNSAFE_componentWillMount() {
        setTimeout(()=>this.setState({statusBarHeight: 1}),500);
    }

    _getLocationAsync = async () => {
        RNLocation.configure({
            distanceFilter: 1, // Meters
            desiredAccuracy: {
                ios: "bestForNavigation",
                android: "highAccuracy"
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
                detail: "fine",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to demo the library",
                    buttonPositive: "OK"
                }
            }
        }).then(granted => {

            if (granted) {

        
                this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    if (locations !== null) {


                this.locationSubscription();
                        this.setState({
                            region: {
                                latitude: locations[0].latitude,
                                longitude: locations[0].longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.003
                            },
                            GolfCars:this.state.GolfCars.map((car) => {
                                var ncar = {
                                    ...car,
                                    coordinate:{
                                        latitude: locations[0].latitude + ((0.0003 * car.id) *  Math.pow(-1,car.id)),
                                        longitude: locations[0].longitude - ((0.0003 * car.id) *  Math.pow(-1,car.id))
                                    }
                                }
                                return ncar
                            })
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

    onViewableItemsChanged = (item) => {
        const duration = 1000
        if (this.markers[item.id]) {
            this.markers[item.id].showCallout();
        }

        const region = {
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            latitudeDelta: 0.0002,
            longitudeDelta: 0.0002,
        };
        this.map.animateToRegion(region, duration)
        
    }
    LogOut = async (navigation) =>{
        try {
                navigation.navigate('Home')
                await AsyncStorage.clear();
          } catch (error) {
            console.log("error clear store data")
            console.log(error)
        }
    }

    setModalVisible=(bol, item)=>{
        this.setState({
            ...this.state,
            itemSelected:item,
            modalVisible:bol
        })
    }

    getMarkers(){
        if(this.state.region !== null)
        {
            return(
                this.state.GolfCars.map((car) => {
                    return (
                        <Marker
                            identifier={car.id.toString()}
                            ref={(ref) => this.markers[car.id] = ref}
                            key={car.id}
                            coordinate={car.coordinate}>
                                <Image source={marker2} style = {styles.markerImg}/>
                                <Callout
                                alphaHitTest
                                tooltip
                                style={styles.customView}
                                onPress={() => {this.openLink(car.coordinate.latitude,car.coordinate.longitude,2)}}>
                                <CustomCallout>
                                    <Text style={{ fontWeight: 'bold', color:'white' }}>{car.nombre}</Text>
                                    <Text style={{ fontSize: 10, color:'white' }}>{'Numero de puestos: ' + car.seating}</Text>
                                </CustomCallout>
                            </Callout>
                        </Marker>)
                })
            )
        }
    }

    openLink(lat,lon,opc){
        var url = ''
        if(opc ===2)
        {
             url = 'https://www.google.com/maps/dir/?api=1&origin='
                                                + this.state.region.latitude + ', '
                                                + this.state.region.longitude + '&destination='
                                                + lat + ', '
                                                + lon + '&travelmode=walking';
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
            <View style={[styles.container, {paddingTop: this.state.statusBarHeight}]}>
                <SafeAreaView style={{flex : 0, backgroundColor : 'rgba(2,127,1,0.8)'}} />
                <MapView
                    mapPadding= {{ top: 0, right: 0, bottom: 0, left: 0 }}
                    showsMyLocationButton= {true}
                    provider={PROVIDER_GOOGLE} 
                    mapType='hybrid'
                    style={styles.map}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    ref={(map) => { this.map = map }}
                    zoomEnabled={true}>
                    {this.getMarkers()}
                </MapView>
                <ModalQR 
                    modalVisible = {this.state.modalVisible} 
                    itemSelected = {this.state.itemSelected}
                    Remove = {this._removeEventListener}
                    ModalManage = {(bol,item) => this.setModalVisible(bol,item)}
                    navigation = {navigation}/>
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
        flex:11
    },
    buttons:{
        flex:1,
        height:60,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    markerImg:{
        width:sizeW * 10,
        height:sizeW * 10
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
        backgroundColor: '#027f01',
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
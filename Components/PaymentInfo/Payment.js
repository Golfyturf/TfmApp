import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
    StyleSheet,
    View,
    Dimensions
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
        padding:50
    },
    carInfo:{
        flex:1,
        backgroundColor: 'red',
        marginBottom:15
    },
    payInfo:{
        flex:1,
        backgroundColor: 'red'
    }

});
export default MyLocationMapMarker;
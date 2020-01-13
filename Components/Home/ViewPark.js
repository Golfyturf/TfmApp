import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
    Image
} from 'react-native'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CurrentLocationButton = function (props) {
    return (
        <TouchableOpacity style={styles.container}
        onPress={() => {props.animate(props.data)}}>
            <View style={styles.columnleft}>
                <Image style={styles.iconImg} source={marker}/>
            </View>
            <View style={styles.columncenter}>
                <Text style={{fontWeight:'bold'}}>{props.data.nombre}</Text>
                <Text style={{opacity:0.5}}>{props.data.dir}</Text>
            </View>
            <View style={styles.columnright}>
                <Text style={{fontSize:12, fontWeight:'bold'}}>{props.data.distance}</Text>
                <Text style={{fontSize:8}}>a Km</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        flexDirection:'row',
        width: WIDTH,
        height: HEIGHT/10,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal:5,
        marginVertical:5,
        alignItems: 'center'
    },
    columnleft:{
        flex:1,
        paddingHorizontal:15
    },
    columncenter:{
        flex:10,
        marginHorizontal:10,
        flexDirection:'column',
        borderLeftWidth:1,
        borderLeftColor:'#E6E5DF',
        borderRightWidth:1,
        borderRightColor:'#E6E5DF',
        alignItems:'center'
    },
    columnright:{
        flex:2,
        flexDirection:'column',
        alignContent:'flex-end',
        alignItems:'center',
    },
    iconImg:{
        width:30,
        height:30
    }
})

export default CurrentLocationButton;
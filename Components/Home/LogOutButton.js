import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import ml from '../../assets/images/logout.png'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LogOutButton = function (props) {
    return (
        <TouchableOpacity
        style={styles.container}
            onPress={() => {props.logOutMethod(props.nav)}}
        >
            <Image style={styles.iconImg} source={ml} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        top:50,
        left:20,
        position: 'absolute',
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
    iconImg:{
        width:19,
        height:19
    }
})

export default LogOutButton;
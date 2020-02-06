import React from 'react'
import {
    View,
    Modal,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import Spinner from 'react-native-spinkit'
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 


const Loading = function (props) {

    return (
            <Modal
                presentationStyle={"overFullScreen"}
                animationType="fade"
                transparent={true}
                visible={props.isLoading}>
                <View style={styles.Container}>
                    <Spinner isVisible={true} color={'rgba(2,127,1,1)'} size={150} type={'Circle'}/>
                    <Text style={styles.message}>{props.message}</Text>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    Container: {
        width:WIDTH,
        height:HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    message:{
        fontWeight:'bold',
        color:'rgba(2,127,1,1)',
        fontSize:sizeW * 5,
        margin: sizeH * 10,

    }
})

export default Loading;
import React from 'react'
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const ModalQR = function (props) {
    onSuccess = (e) => {
        alert(e.data)
        props.ModalManage(false,props.itemSelected)
        props.navigation.navigate('PayInfo')
        props.Remove()
      }

    return (
        <Modal
        //presentationStyle={'pageSheet'}
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}>
            {}
            <QRCodeScanner
                        topViewStyle={styles.topView}
                        containerStyle={styles.containerStyle}
                        cameraStyle={styles.cameraStyle}
                        onRead={(e) => onSuccess(e)}   
                        topContent={
                        <Text style={styles.title}>
                            {'Dirigete al vehiculo y escanea el codigo ' + '\n' + 'para continuar'}
                        </Text>
                        }
                        bottomContent={
                            <>
                            <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => {props.ModalManage(false,props.itemSelected)}}>
                                    <Text style={{color:'white'}}>Cancelar</Text>
                            </TouchableOpacity>
                             <TouchableOpacity
                             style={styles.backButton}
                             onPress={(e) => onSuccess(e)}> 
                             <Text style={{color:'white'}}>moverse</Text>
                            </TouchableOpacity>
                            </>
                        }
                    />

    </Modal>
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'rgba(2,127,1,0.45)',
        height:'50%',
        alignContent:"center"
    },
    title:{
        fontWeight:'bold',
        textAlign:'center',
        color:'white',
        fontSize:19
    },
    topView:{
        
        borderRadius:10
    },
    cameraStyle: {
        width: '80%',
        alignSelf:'center'
    },
    backButton:{
        backgroundColor:'#FF5B5B',
        width:90,
        height:30,
        borderRadius:10,
        padding:5,
        alignContent:'center',
        alignItems:'center'
    }
})

export default ModalQR;
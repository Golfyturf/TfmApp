import React from 'react'
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 


const ModalQR = function (props) {
    onSuccess = (e) => {
        alert(e.data)
        props.ModalManage(false, props.itemSelected)
        props.navigation.navigate('PayInfo')
        props.Remove()
    }

    return (
        <View style={styles.bottomBar}>
            <TouchableHighlight
            style={[styles.btnAcept, { width: 100 }]}
            onPress={() => {this.props.confimacionF(2)}}>
            <Text style={styles.textConfirm}>Confirmar Destino</Text>
            </TouchableHighlight>
            <Modal
                //presentationStyle={'pageSheet'}
                animationType="slide"
                transparent={false}
                visible={props.modalVisible}>
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
                                onPress={() => { props.ModalManage(false, props.itemSelected) }}>
                                <Text style={{ color: 'white' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={(e) => onSuccess(e)}>
                                <Text style={{ color: 'white' }}>moverse</Text>
                            </TouchableOpacity>
                        </>
                    }
                />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(2,127,1,0.45)',
        height: '50%',
        alignContent: "center"
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontSize: 19
    },
    topView: {

        borderRadius: 10
    },
    cameraStyle: {
        width: '80%',
        alignSelf: 'center'
    },
    btnAcept: {
      flex: 1,
      height: sizeH * 7,
      backgroundColor: '#ffc326',
      alignItems:'center',
      justifyContent:'center',
      margin: 15,
      borderRadius: 12
    },
    bottomBar: {
      zIndex: 1,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F2F210',
      position: 'absolute',
      bottom:0
    },
})

export default ModalQR;
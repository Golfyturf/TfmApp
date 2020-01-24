import React from 'react'
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    Text, 
    Image
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRicon from '../../assets/images/qrIcon.png';
import MenuIcon from '../../assets/images/MenuIcon.png'
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
const sizeH = HEIGHT / 100;
const sizeW = WIDTH / 100; 


const ModalQR = function (props) {
    onSuccess = (e) => {
        props.ModalManage(false, props.itemSelected)
        props.navigation.navigate('PayInfo')
    }

    return (
        <View style={styles.bottomBar}>
            
            <TouchableHighlight
            style={styles.menuButton}
            onPress={() => {props.navigation.toggleDrawer()}}>
                <Image
                        source={MenuIcon}
                        style={styles.MenuIcon}
                    />
            </TouchableHighlight>
            <TouchableHighlight
            style={styles.btnAcept}
            onPress={() => { props.ModalManage(true, props.itemSelected)}}>
            <>
                    <Image
                        source={QRicon}
                        style={styles.backgroundContainer}
                    />
                    <Text style={styles.textConfirm}>Scan</Text>
            </>
            </TouchableHighlight>
            <TouchableHighlight
            style={styles.menuButton}
            onPress={() => {props.navigation.toggleDrawer()}}>
                <Image
                        source={MenuIcon}
                        style={styles.MenuIcon}
                    />
            </TouchableHighlight>
            <Modal
                presentationStyle={'pageSheet'}
                animationType='fade'
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
        fontSize: sizeW * 5
    },
    topView: {
        borderRadius: 10
    },
    cameraStyle: {
        width: '80%',
        alignSelf: 'center'
    },
    MenuIcon:{
        width: sizeW * 4,
        height:sizeW * 4
    },
    menuButton:{
      flex: 2,
      height: '50%',
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent:'center',
      margin:sizeW * 2,
      marginBottom: sizeH * 3,
      borderRadius:HEIGHT    
    },
    btnAcept: {
      flex: 10,
      flexDirection:'row',  
      height: sizeH * 4,
      backgroundColor: 'rgba(2,127,1,1)',
      alignItems:'center',
      justifyContent:'center',
      margin:sizeW * 2,
      marginBottom: sizeH * 3,
      borderRadius: 12
    },
    backButton: {
        backgroundColor: '#FF5B5B',
        width: sizeW * 50,
        height: sizeH * 3,
        margin: sizeW * 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:'center'
    },
    textConfirm:{
        fontSize: sizeW * 4,
        color: 'white'
    },
    backgroundContainer:{
        width: sizeW * 12,
        height: sizeW * 12,
        marginRight: sizeW * 4
    },
    bottomBar: {
      zIndex: 1,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F2F250',
      position: 'absolute'
    },
})

export default ModalQR;
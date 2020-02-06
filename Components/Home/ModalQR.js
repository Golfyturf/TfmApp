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
        props.createService(e,props.itemSelected )
    }

    other = () => {
        props.createService("a",props.itemSelected )
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
            <Modal
                presentationStyle={"overFullScreen"}
                animationType="slide"
                transparent={false}
                visible={props.modalVisible}>
                <QRCodeScanner
                    customMarker={
                        <View style={styles.MarkerQRContainer}>
                            <View style={styles.QRTop}>

                            </View>
                            <View style={styles.QRCenter}>
                                <View style = {styles.QRLeft}>

                                </View>
                                <View style = {styles.MarkerQR}>

                                </View>
                                <View style = {styles.QRRight}>

                                </View>
                            </View>
                            <View style={styles.QRBottom}>
                            </View>
                        </View>
                    }
                    showMarker={true}
                    containerStyle={styles.containerStyle}
                    cameraStyle={styles.cameraStyle}
                    onRead={(e) => onSuccess(e)}
                />
                
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => { props.ModalManage(false, props.itemSelected)}}>
                    <Text style={{ color: 'white' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.move}
                    onPress={() => other()}>
                    <Text style={{ color: 'white' }}>moverse</Text>
                </TouchableOpacity>
                        

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
        width: '100%',
        height:sizeH * 100,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    MenuIcon:{
        width: sizeW * 4,
        height:sizeW * 4
    },
    QRTop:{
        flex:0.5,
        backgroundColor:'#00000099'
    },
    QRCenter:{
        flex:1,
        flexDirection:'row'
    },
    MarkerQR:{
        flex:5,
        backgroundColor: '#00000000',
        borderWidth:1,
        borderColor:'blue'
    },
    QRLeft:{
        flex:1,
        backgroundColor:'#00000099'
    },
    QRRight:{
        flex:1,
        backgroundColor:'#00000099'

    },
    QRBottom:{
        flex:1,
        backgroundColor:'#00000099'
    },
    MarkerQRContainer:{
      width: WIDTH,
      height: HEIGHT,
      flexDirection:'column'
    },
    menuButton:{
      flex: 2,
      height:sizeH * 5,
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 100,
      marginHorizontal: sizeW * 2,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10,
        elevation: 10   
    },
    btnAcept: {
      flex: 10,
      flexDirection:'row',  
      height: sizeH * 5,
      backgroundColor: 'rgba(2,127,1,1)',
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 12,
      marginHorizontal: sizeW * 2 ,

      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10,
        elevation: 10  
    },
    backButton: {
        backgroundColor: '#FF5B5B',
        position:'absolute',
        bottom:sizeH * 10,
        width: sizeW * 50,
        height: sizeH * 4,
        margin: sizeW * 3,
        borderRadius: 15,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent:'center'
    },

    move: {
        backgroundColor: '#FF5B5B',
        position:'absolute',
        bottom:sizeH * 5,
        width: sizeW * 50,
        height: sizeH * 4,
        margin: sizeW * 3,
        borderRadius: 15,
        alignSelf:'center',
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
      backgroundColor: 'white',
      paddingBottom:sizeH * 1
    }
})

export default ModalQR;
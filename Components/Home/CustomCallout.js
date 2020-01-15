import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>

        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
            <TouchableOpacity
              style={styles.GoButton}
              onPress={() => { props.ModalManage(false, props.itemSelected) }}>
              <Text style={{color:'#027f01'}}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  GoButton: {
    backgroundColor: 'white',
    width:70,
    marginTop:5,
    borderRadius:10,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:"center"
  },
  bubble: {
    width: 150,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#027f01',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 70,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#027f01',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#027f01',
    alignSelf: 'center'
  },
});

export default CustomCallout;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JRow from './JRow';
import THouse from '../assets/svg/Icon/THouse.svg';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
const JTransaction = ({text, image,date}) => {
  return (
    <JRow style={styles.container}>
        <JRow>
      <View style={styles.img}>{image}</View>
      <View style={styles.txtView}>
        <JText fontWeight={'bold'}>{text}</JText>
        <JText >{date}</JText>
      </View>
      </JRow>
      <JText style={{marginRight: RFPercentage(2),}}>Sr 95</JText>
    </JRow>
  );
};

export default JTransaction;

const styles = StyleSheet.create({
  container: {
    justifyContent:"space-between",
    alignItems: 'center',
    height: RFPercentage(8),
    backgroundColor:colors.tileColor[0],
    marginVertical: RFPercentage(1),
  },
  img: {
    height:RFPercentage(8),
    width:RFPercentage(8),
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtView:{marginHorizontal: RFPercentage(1),justifyContent:'space-evenly'}
});

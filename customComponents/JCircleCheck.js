import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../config/colors';
import { useState } from 'react';
import JRow from './JRow';
import JText from './JText';

const JCircleCheck = ({language,isSelected,onPress}) => {
    // const [check,setCheck]= useState(false)
  return (
    <JRow
    style={{
      width: '100%',
      paddingHorizontal:RFPercentage(2),
      height: RFPercentage(6),
      backgroundColor: '#EDF2F75E',
      justifyContent: 'space-between',
      marginVertical: RFPercentage(1),
    }}>
    <JText>{language}</JText>
    <Pressable
    onPress={onPress}
      style={{
        height: RFPercentage(3),
        width: RFPercentage(3),
        borderRadius: RFPercentage(1.5),
        borderWidth: RFPercentage(0.1),
        borderColor: colors.purple[0],
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isSelected &&
      <View
        style={{
          height: RFPercentage(2.2),
          width: RFPercentage(2.2),
          borderRadius: RFPercentage(1.25),
          backgroundColor: colors.purple[0],
        }}/>}
    </Pressable>
  </JRow>
    
  );
};

export default JCircleCheck;

const styles = StyleSheet.create({});

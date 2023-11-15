import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../config/colors';
import {useState} from 'react';
import JRow from './JRow';
import JText from './JText';
import JIcon from './JIcon';

const JCircleCheck = ({language, isSelected, onPress}) => {
  // const [check,setCheck]= useState(false)
  return (
    <JRow
      disabled={false}
      onPress={onPress}
      style={{
        width: '100%',
        paddingHorizontal: RFPercentage(2),
        height: RFPercentage(7),
        backgroundColor: isSelected ? '#b0e2f7' : '#EDF2F75E',
        justifyContent: 'space-between',
        marginVertical: RFPercentage(1),
      }}>
      <JText fontWeight='600'>{language}</JText>
      <View
        style={{
          height: RFPercentage(3),
          width: RFPercentage(3),
          backgroundColor:isSelected?colors.purple[0]:'#EDF2F75E',
          borderRadius: RFPercentage(1.5),
          borderWidth: RFPercentage(isSelected?0:0.1),
          borderColor: colors.purple[0],
         
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {
          isSelected && (
            <JIcon
              icon="an"
              name={'check'}
              color={colors.white[0]}
            />
          )
          // <View
          //   style={{
          //     height: RFPercentage(2.2),
          //     width: RFPercentage(2.2),
          //     borderRadius: RFPercentage(1.25),
          //     backgroundColor: colors.purple[0],
          //     alignSelf:'center'
          //   }}/>
        }
      </View>
    </JRow>
  );
};

export default JCircleCheck;

const styles = StyleSheet.create({});

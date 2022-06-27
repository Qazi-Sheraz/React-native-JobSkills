import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';

export default function JFooter({onPress, children}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 0.1,
        backgroundColor: '#D6D5D5',
        borderTopEndRadius: RFPercentage(3),
        borderTopStartRadius: RFPercentage(3),
        shadowColor: colors.black[0],
        elevation: 5,
        shadowOpacity: 0.6,
        shadowRadius: 1,
        shadowOffset: {
          height: -1,
          width: 0,
        },

        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <JText fontColor={colors.placeHolderColor[0]}>{children}</JText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

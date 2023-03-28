import {StyleSheet} from 'react-native';
import React from 'react';
import JText from './JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JStatus({status,onPress}) {
  return (
    <JText
   
      style={{
        paddingHorizontal: RFPercentage(1.5),
        paddingVertical: RFPercentage(1),
        backgroundColor:
          status === 'Active'
            ? colors.applied[0]
            : status === 'Pending'
            && colors.drafted[0],
        color: colors.white[0],
        textAlign: 'center',
      }}>
      {status}
    </JText>
  );
}

const styles = StyleSheet.create({});

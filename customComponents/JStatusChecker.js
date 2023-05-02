import {StyleSheet} from 'react-native';
import React from 'react';
import JText from './JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JStatusChecker({status,onPress}) {
  return (
    <JText
   
      style={{
        paddingHorizontal: RFPercentage(1.5),
        paddingVertical: RFPercentage(1),
        backgroundColor:
          status === 'Drafted'
            ? colors.drafted[0]
            : status === 'Applied'
            ? colors.applied[0]
            : status === 'Rejected'
            ? colors.rejected[0]
            : status === 'Selected'
            ? colors.selected[0]
            : status === 'Shortlisted'
            ? colors.shortlisted[0]
            : colors.interview_scheduled[0],
            
        color: colors.white[0],
        textAlign: 'center',
      }}>
      {status}
    </JText>
  );
}

const styles = StyleSheet.create({});

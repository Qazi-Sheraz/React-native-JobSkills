import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JRow from './JRow';
import colors from '../config/colors';
import JCircleCheck from './JCircleCheck';
import {RFPercentage} from 'react-native-responsive-fontsize';

const JLanguages = ({language}) => {
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
      <Text>{language}</Text>
      <JCircleCheck />
    </JRow>
  );
};

export default JLanguages;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

const Job = () => {
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Jobs'}
            </JText>
          }
        />
      }></JScreen>
  );
};

export default Job;

const styles = StyleSheet.create({});

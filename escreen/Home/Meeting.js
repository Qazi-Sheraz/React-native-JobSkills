import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientProfileHeader from '../../customComponents/JGradientProfileHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';

const Meeting = () => {
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Meetings'}
            </JText>
          }
        />
      }></JScreen>
  );
};

export default Meeting;

const styles = StyleSheet.create({});

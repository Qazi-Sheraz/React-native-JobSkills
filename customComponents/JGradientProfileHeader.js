import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import JGradientHeader from './JGradientHeader';
export default function JGradientProfileHeader({
  heading,
  onBackPress,
  onSavePress,
  isValid,
}) {
  return (
    <JGradientHeader
      left={
        <Feather
          onPress={onBackPress}
          name="chevron-left"
          size={RFPercentage(3.5)}
          color={colors.white[0]}
        />
      }
      center={
        <JText
          fontColor={colors.white[0]}
          fontWeight="bold"
          fontSize={RFPercentage(2.5)}>
          {heading}
        </JText>
      }
      right={
        <JText
          onPress={onSavePress}
          fontColor={colors.white[0]}
          fontSize={RFPercentage(2)}>
          {'Save'}
        </JText>
      }
    />
  );
}

const styles = StyleSheet.create({});

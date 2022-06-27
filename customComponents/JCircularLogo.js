import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import JLogoImage from './JLogoImage';
export default function JCircularLogo({
  containerStyle,
  containerHeight = RFPercentage(10),
  containerWidth = RFPercentage(10),
  containerRadius = RFPercentage(10),
  imgHeight = heightPercentageToDP(10),
  imgWidth = widthPercentageToDP(10),
  multiple = 1,
}) {
  return (
    <LinearGradient
      colors={['#4B1B6D', '#72488F', '#7A19C1']}
      start={{x: 0, y: 1}}
      end={{x: -1, y: 0}}
      style={[
        {
          height: containerHeight * multiple,
          width: containerWidth * multiple,
          borderRadius: containerRadius * multiple,
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <JLogoImage height={imgHeight * multiple} width={imgWidth * multiple} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});

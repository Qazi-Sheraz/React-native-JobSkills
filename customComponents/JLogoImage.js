import {StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export default function JLogoImage({
  imageStyle,
  height = heightPercentageToDP(30),
  width = widthPercentageToDP(30),
  tintColor = colors.white[0],
  resizeMode = 'contain',
}) {
  return (
    <Image
      source={require('../assets/images/logo/logo.png')}
      style={[
        {
          height: height,
          width: width,
          tintColor: tintColor,
          resizeMode: resizeMode,
        },
        imageStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({});

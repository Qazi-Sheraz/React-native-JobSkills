import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JEmpty({
  imageStyle,
  imgHeight = RFPercentage(56 / 2),
  imgWidth = RFPercentage(75 / 2),
  tintColor,
  resizeMode = 'contain',
  height = heightPercentageToDP(80),
  msg = 'No Data Available !',
}) {
  return (
    <View
      style={{
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/empty/empty.png')}
        style={[
          {
            height: imgHeight,
            width: imgWidth,
            tintColor: tintColor,
            resizeMode: resizeMode,
            marginBottom: RFPercentage(3),
          },
          imageStyle,
        ]}
      />
      <JText
        fontColor={colors.purple[0]}
        fontWeight="bold"
        fontAlign="center"
        fontSize={RFPercentage(2.5)}>
        {msg}
      </JText>
    </View>
  );
}

const styles = StyleSheet.create({});

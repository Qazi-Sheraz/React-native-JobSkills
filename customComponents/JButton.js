import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export default function JButton({
  children,
  style,
  backgroundColor,
  borderWidth,
  borderColor,
  fontStyle,
  onPress,
  isValid,
  ref,
}) {
  return isValid !== undefined && isValid === false ? (
    <View
      ref={ref}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: colors.isValid[0],
          paddingVertical: RFPercentage(1),
          paddingHorizontal: RFPercentage(16),
          borderWidth: borderWidth ? borderWidth : RFPercentage(0.1),
          borderColor: borderColor ? borderColor : colors.placeHolderColor[0],
          height: heightPercentageToDP(5),
          width: '100%',
        },
        style,
      ]}>
      <JText style={[{color: colors.placeHolderColor[0]}, fontStyle]}>
        {children}
      </JText>
    </View>
  ) : (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.primary[0],
          height: heightPercentageToDP(5),
          width: '100%',
          borderWidth: borderWidth ? borderWidth : RFPercentage(0.1),
          borderColor: borderColor ? borderColor : colors.primary[0],
          shadowColor: colors.black[0],
          elevation: 4,
          shadowOpacity: 0.6,
          shadowRadius: 1,
          shadowOffset: {
            height: 1,
            width: 0,
          },
        },
        style,
      ]}>
      <JText style={fontStyle}>{children}</JText>
    </TouchableOpacity>
  );
}

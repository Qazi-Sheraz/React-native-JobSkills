import {Text} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';

export default function JErrorText({
  children,
  style,
  fontSize = RFPercentage(1.5),
  fontColor = colors.danger[0],
  textDecorationLine = 'none',
  fontWeight = 'normal',
  onPress,
}) {
  return (
    <Text
      onPress={onPress}
      style={[
        {
          fontFamily: 'Nunito Sans',
          fontSize: fontSize,
          color: fontColor,
          textDecorationLine: textDecorationLine,
          fontWeight: fontWeight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

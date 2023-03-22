import {Text} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';

export default function JText({
  children,
  style,
  fontSize = RFPercentage(1.9),
  fontColor = colors.black[0],
  textDecorationLine = 'none',
  fontWeight = 'normal',
  onPress,
  fontAlign = 'auto',
  numberOfLines,
  ellipsizeMode,
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      style={[
        {
          fontFamily: 'Nunito Sans',
          fontSize: fontSize,
          color: fontColor,
          textDecorationLine: textDecorationLine,
          fontWeight: fontWeight,
          textAlign: fontAlign,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

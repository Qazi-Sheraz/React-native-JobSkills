import {StyleSheet, View} from 'react-native';
import React from 'react';
import JText from './JText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JDivider({
  children,
  containerStyle,
  dividerStyle,
  fontStyle,
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',

          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <View
        style={[
          {
            height: heightPercentageToDP(0.1),
            paddingHorizontal: widthPercentageToDP(16),
            backgroundColor: colors.divider[0],
          },
          dividerStyle,
        ]}
      />
      <JText
        style={[
          {paddingHorizontal: RFPercentage(2), color: colors.dividerText[0]},
          fontStyle,
        ]}>
        {children}
      </JText>
      <View
        style={[
          {
            height: heightPercentageToDP(0.1),
            paddingHorizontal: widthPercentageToDP(16),
            backgroundColor: colors.divider[0],
          },
          dividerStyle,
        ]}
      />
    </View>
  );
}

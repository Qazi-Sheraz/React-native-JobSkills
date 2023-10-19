import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';

export default function JSkip({
  children,
  onPress,
  containerStyle,
  fontColor = colors.white[0],
  fontSize = RFPercentage(2.1),
  fontWeight = 'bold',
}) {
  return (
    <View style={[styles.skip, containerStyle]}>
      <JText
        onPress={onPress}
        fontWeight={fontWeight}
        fontColor={fontColor}
        fontSize={fontSize}
        textDecorationLine="underline">
        {children}
      </JText>
    </View>
  );
}

const styles = StyleSheet.create({
  skip: {
    alignItems: 'flex-end',
    paddingHorizontal: RFPercentage(1),
  },
});

import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
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
    <Pressable onPress={onPress} style={[styles.skip, containerStyle]}>
      <JText
        fontWeight={fontWeight}
        fontColor={fontColor}
        fontSize={fontSize}
        textDecorationLine="underline">
        {children}
      </JText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  skip: {
    alignItems: 'flex-end',
    padding: RFPercentage(1),
  },
});

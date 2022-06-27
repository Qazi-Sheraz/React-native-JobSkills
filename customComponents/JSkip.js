import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';

export default function JSkip({
  children,
  onPress,
  containerStyle,
  fontColor = colors.white[0],
  fontSize = RFPercentage(2),
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
    flex: 0.2,
    alignItems: 'flex-end',
    padding: RFPercentage(2),
  },
});

import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
export default function JSideHeading({
  leftHeading,
  onLeftHeadingPress,
  rightHeading,
  onRightHeadingPress,
  leftHeadingStyle,
  rightHeadingStyle,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: RFPercentage(2),
      }}>
      <JText
        onPress={onLeftHeadingPress}
        style={[{fontSize: RFPercentage(2)}, leftHeadingStyle]}>
        {leftHeading}
      </JText>
      <JText
        onPress={onRightHeadingPress}
        style={[
          {fontSize: RFPercentage(2), textDecorationLine: 'underline'},
          rightHeadingStyle,
        ]}>
        {rightHeading}
      </JText>
    </View>
  );
}

const styles = StyleSheet.create({});

import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import colors from '../config/colors';

export default function JShadowView({
  containerStyle,
  children,
  row = 'column',
  shadowColor = colors.black[0],
  onPress,
  isPressable = true,
}) {
  return isPressable === true ? (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: row,
          backgroundColor: colors.white[0],
          shadowColor: shadowColor,
          elevation: 4,
          shadowOpacity: 0.6,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        },
        containerStyle,
      ]}>
      {children}
    </Pressable>
  ) : (
    <View
      style={[
        {
          flexDirection: row,
          backgroundColor: colors.white[0],
          shadowColor: shadowColor,
          elevation: 4,
          shadowOpacity: 0.6,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        },
        containerStyle,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});

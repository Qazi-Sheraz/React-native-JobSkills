import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
export default function JGradientView({
  containerStyle,
  children,
  flexDirection = 'column',
  onPress,
  colors = ['#9400ff90', 'rgba(0, 0, 0, 1)'],
}) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={colors}
        style={[
          {
            flexDirection: flexDirection,
          },
          containerStyle,
        ]}>
        {children}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

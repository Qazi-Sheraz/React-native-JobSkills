import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
export default function JGradientView({
  containerStyle,
  children,
  flexDirection = 'column',
  onPress,
  colors = ['#9A67C6', '#800FD2', '#6E2F9B', '#3A1257'],
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

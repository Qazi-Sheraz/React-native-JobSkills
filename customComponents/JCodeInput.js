import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';

export default function JCodeInput({
  style,
  ref,
  value,
  onChangeText,
  onKeyPress,
}) {
  return (
    <TextInput
      onKeyPress={onKeyPress}
      keyboardType="numeric"
      style={[
        {
          width: RFPercentage(6),
          height: RFPercentage(6),
          borderWidth: 1,
          borderColor: colors.inputBorder[0],
          marginRight: 10,
          textAlign: 'center',
        },
        style,
      ]}
      value={value}
      ref={ref}
      onChangeText={onChangeText}
      maxLength={1}
      blurOnSubmit={false}
    />
  );
}

const styles = StyleSheet.create({});

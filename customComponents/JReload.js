import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function JReload({
  onPress,
  fontSize = RFPercentage(2),
  fontColor = colors.black[0],
  containerBackground = colors.primary[0],
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: RFPercentage(3.2),
        width: RFPercentage(3.2),
        borderRadius: RFPercentage(1.6),
        backgroundColor: containerBackground,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons color={fontColor} name="reload" size={fontSize} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

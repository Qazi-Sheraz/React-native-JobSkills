import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import JRow from './JRow';
export default function JHeader({
  left,
  center,
  right,
  containerStyle,
  view1Style,
  view2Style,
  view3Style,
}) {
  return (
    <JRow
      style={[
        {
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: widthPercentageToDP(5),
        },
        containerStyle,
      ]}>
      <View style={[styles.views, view1Style]}>{left}</View>
      <View style={[styles.views, view2Style]}>{center}</View>
      <View style={[styles.views, view3Style]}>{right}</View>
    </JRow>
  );
}

const styles = StyleSheet.create({
  views: {justifyContent: 'center', alignItems: 'center'},
});

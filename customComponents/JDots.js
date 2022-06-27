import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JDots({slide}) {
  return slide === 1
    ? Array(4)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginRight: i == 3 ? 0 : RFPercentage(0.8),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 ? colors.dots[0] : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ))
    : slide === 2
    ? Array(4)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginRight: i == 3 ? 0 : RFPercentage(0.8),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 || i == 1 ? colors.dots[0] : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ))
    : slide === 3
    ? Array(4)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginRight: i == 3 ? 0 : RFPercentage(0.8),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 || i == 1 || i == 2
                  ? colors.dots[0]
                  : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ))
    : Array(4)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginRight: i == 3 ? 0 : RFPercentage(0.8),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 || i == 1 || i == 2 || i == 3
                  ? colors.dots[0]
                  : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ));
}

const styles = StyleSheet.create({});

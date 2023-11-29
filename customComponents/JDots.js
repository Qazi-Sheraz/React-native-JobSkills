import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
export default function JDots({slide, count}) {
  return slide === 1
    ? Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginHorizontal: RFPercentage(0.4),
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
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
    ? Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              marginHorizontal: RFPercentage(0.4),
              backgroundColor:
                i == 0 || i == 1 ? colors.dots[0] : colors.screenBackground[0],
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ))
    : slide === 3
    ? Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              marginHorizontal: RFPercentage(0.4),
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
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
    : slide === 4
    ? Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
              marginHorizontal: RFPercentage(0.4),
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
        ))
    : slide === 5
    ? Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
              marginHorizontal: RFPercentage(0.4),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 || i == 1 || i == 2 || i == 3 || i == 4
                  ? colors.dots[0]
                  : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ))
    : Array(count)
        .fill(null)
        .map((_, i) => (
          <View
            key={i}
            style={{
              height: RFPercentage(1.5),
              // marginHorizontal: i == count - 1 ? 0 : RFPercentage(0.4),
              marginHorizontal: RFPercentage(0.4),
              width: RFPercentage(1.5),
              borderRadius: RFPercentage(0.75),
              backgroundColor:
                i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5
                  ? colors.dots[0]
                  : colors.screenBackground[0],
              borderWidth: RFPercentage(0.1),
              borderColor: colors.dots[0],
            }}
          />
        ));
}

const styles = StyleSheet.create({});

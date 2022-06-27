import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JGradientView from './JGradientView';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JText from './JText';

export default function JGradientHeader({
  left,
  center,
  right,
  height = heightPercentageToDP(10),
  alignItems = 'center',
  paddingTop,
}) {
  return (
    <JGradientView
      flexDirection="row"
      containerStyle={{
        height: height,
        width: '100%',
        paddingHorizontal: RFPercentage(2),
        alignItems: alignItems,
        paddingTop: paddingTop,
      }}>
      <View
        style={{
          width: '33.3333%',
          justifyContent: 'center',

          alignItems: 'flex-start',
        }}>
        {left}
      </View>
      <View
        style={{
          width: '33.3333%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {center}
      </View>
      <View
        style={{
          width: '33.3333%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        {right}
      </View>
    </JGradientView>
  );
}

const styles = StyleSheet.create({});

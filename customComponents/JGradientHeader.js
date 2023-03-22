import {Pressable, StyleSheet, Text, View} from 'react-native';
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
  justifyContent = 'center',
  paddingTop,
  children,
  onPress,
}) {
  return (
    <JGradientView
      flexDirection="column"
      containerStyle={{
        height: height,
        width: '100%',
        paddingHorizontal: RFPercentage(2),
        alignItems: alignItems,
        justifyContent: justifyContent,
        paddingTop: paddingTop,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: alignItems,
          paddingTop: paddingTop,
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={onPress}
          style={{
            justifyContent: 'center',

            alignItems: 'flex-start',
          }}>
          {left}
        </Pressable>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {center}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {right}
        </View>
      </View>

      {children}
    </JGradientView>
  );
}

const styles = StyleSheet.create({});

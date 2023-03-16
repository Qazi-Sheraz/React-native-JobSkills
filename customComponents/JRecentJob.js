import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JText from './JText'
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../config/colors';
const JRecentJob = ({JobName}) => {
  return (
    <Pressable
              onPress={() => alert(JobName)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: RFPercentage(2),
                borderBottomWidth: RFPercentage(0.1),
              }}>
              <Feather
                name="clock"
                size={RFPercentage(3.5)}
                color={colors.black[0]}
                style={{marginRight: RFPercentage(1)}}
              />
              <JText fontSize={RFPercentage(2)}>{JobName}</JText>
            </Pressable>
  )
}

export default JRecentJob

const styles = StyleSheet.create({})
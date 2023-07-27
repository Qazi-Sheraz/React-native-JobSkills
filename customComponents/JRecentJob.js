import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import JText from './JText'
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JRow from './JRow';
const JRecentJob = ({JobName,onPress}) => {
  return (  
  <TouchableOpacity onPress={onPress}>
    <JRow
              
              style={{
                paddingVertical: RFPercentage(2),
                borderBottomWidth: RFPercentage(0.1),
              }}>
              
              <Feather
                name="clock"
                size={RFPercentage(3.5)}
                color={colors.black[0]}
                style={{marginHorizontal: RFPercentage(1)}}
              />
              <JText fontSize={RFPercentage(2)} fontWeight='bold'>{JobName}</JText>
              
            </JRow></TouchableOpacity>
  )
}

export default JRecentJob

const styles = StyleSheet.create({})
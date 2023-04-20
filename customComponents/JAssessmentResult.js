import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JRow from './JRow'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JIcon from './JIcon'
import JText from './JText'
import colors from '../config/colors'

const JAssessmentResult = ({title,percent,color}) => {
  return (
    <JRow
    style={{
      justifyContent: 'space-between',
      borderBottomWidth: RFPercentage(0.1),
      borderColor:'#929292' ,
      paddingVertical: RFPercentage(1),
      marginBottom: RFPercentage(0.2),
    }}>
    <JRow>
      <JIcon icon="fa" name={'circle'} color={color} />
      <JText style={{marginHorizontal: RFPercentage(1)}}>
        {title}
      </JText>
    </JRow>
    <JText>{percent}</JText>
  </JRow>
  )
}

export default JAssessmentResult

const styles = StyleSheet.create({})
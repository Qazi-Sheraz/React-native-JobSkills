import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JText from './JText'

const JCircleImage = ({size,image}) => {
  return (
    <View style={{
        // height:RFPercentage(size),
        // width:RFPercentage(size),
        // borderRadius:RFPercentage(size|2),
        alignItems: 'center',
        justifyContent: 'center',
    }}>
       
      {image}
    </View>
  )
}

export default JCircleImage

const styles = StyleSheet.create({})
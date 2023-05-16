import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JText from './JText'
import { useContext } from 'react'
import { StoreContext } from '../mobx/store'

const JNotfoundData = () => {
  const store = useContext(StoreContext);
  return (
    <View
    style={{
      height: heightPercentageToDP(12),
      // backgroundColor: colors.tileColor[0],
      justifyContent: 'center',
      alignItems: 'center',
     
    }}>
    <Image
      style={{width: RFPercentage(6), height: RFPercentage(6)}}
      source={require('../assets/images/empty/empty.png')}
    />
    <JText style={{marginTop: RFPercentage(1)}}>{store.lang.not_found}</JText>
  </View>
  )
}

export default JNotfoundData

const styles = StyleSheet.create({})
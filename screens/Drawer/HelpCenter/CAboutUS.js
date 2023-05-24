import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StoreContext } from '../../../mobx/store';
import { useContext } from 'react';

const CAboutUS = () => {
  const store = useContext(StoreContext);
  return (
    <View>
      <Text> About US</Text>
    </View>
  )
}

export default CAboutUS

const styles = StyleSheet.create({})
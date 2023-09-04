import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
export default function CLCareerInfo() {
  return (
    <JScreen>
      <SkeletonPlaceholder
        speed="900"
        backgroundColor={colors.skeletonLoader[0]}>
       

      
        <View
          style={{
            marginHorizontal: RFPercentage(2),
          }}
        >
        <View
          style={{
            height: heightPercentageToDP(7),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            height: heightPercentageToDP(25),
            marginTop: RFPercentage(1),
          }}
        />
        <View
          style={{
            height: heightPercentageToDP(7),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            height: heightPercentageToDP(25),
            marginTop: RFPercentage(1),
          }}
        />
</View>
       
      </SkeletonPlaceholder>
    </JScreen>
  );
}

const styles = StyleSheet.create({});

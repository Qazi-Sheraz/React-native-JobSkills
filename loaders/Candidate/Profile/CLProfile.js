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
export default function CLProfile() {
  return (
    <JScreen>
      <SkeletonPlaceholder
        speed="900"
        backgroundColor={colors.skeletonLoader[0]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: heightPercentageToDP(25),
          }}></View>

        <View
          style={{
            width: RFPercentage(20),
            height: RFPercentage(20),
            borderRadius:RFPercentage(10),
            alignSelf:'center',
            marginTop:RFPercentage(-10)
            
            
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(2),
            alignSelf:'center',
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(2),
            alignSelf:'center',
          }}
        />
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
            height: heightPercentageToDP(15),
            marginTop: RFPercentage(2),
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
            height: heightPercentageToDP(15),
            marginTop: RFPercentage(2),
          }}
        />
</View>
       
      </SkeletonPlaceholder>
    </JScreen>
  );
}

const styles = StyleSheet.create({});

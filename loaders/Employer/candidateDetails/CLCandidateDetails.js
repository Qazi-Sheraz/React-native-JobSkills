import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
export default function CLCandidateDetails() {
  return (
    <JScreen>
      <SkeletonPlaceholder
        speed="900"
        backgroundColor={colors.skeletonLoader[0]}>


        <View
          style={{
            width: RFPercentage(10),
            height: RFPercentage(10),
            borderRadius: RFPercentage(5),
            alignSelf: 'center',
            marginTop: RFPercentage(4),


          }}
        />
        <View
          style={{
            width: widthPercentageToDP(60),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(4),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(2),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(60),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(2),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(60),
            height: heightPercentageToDP(1),
            marginTop: RFPercentage(2),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(3),
            marginTop: RFPercentage(2),
            alignSelf: 'center',
          }}
        />

        <View
          style={{
            marginHorizontal: RFPercentage(2),
          }}
        >
          <View
            style={{
              height: heightPercentageToDP(3),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />

          <View
            style={{
              width:RFPercentage(10),
              height: heightPercentageToDP(3),
              marginTop: RFPercentage(2),
              alignSelf:'center'
            }}
          />
          <View
            style={{
              height: heightPercentageToDP(3),
              marginTop: RFPercentage(2),
            }}
          />

          <View
            style={{
              height: heightPercentageToDP(10),
              marginTop: RFPercentage(2),
            }}
          />
         
          <View
            style={{
              height: heightPercentageToDP(3),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(80),
              height: heightPercentageToDP(1),
              marginTop: RFPercentage(2),
            }}
          />
           <View
            style={{
              width:RFPercentage(10),
              height: heightPercentageToDP(3),
              marginTop: RFPercentage(2),
              alignSelf:'center'
            }}
          />
        </View>

      </SkeletonPlaceholder>
    </JScreen>
  );
}

const styles = StyleSheet.create({});

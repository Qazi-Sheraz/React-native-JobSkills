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
export default function CLSelectedJob() {
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
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(2),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(15),
            marginTop: RFPercentage(2),
          }}
        />

        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(2),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(10),
            marginTop: RFPercentage(2),
          }}
        />

        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(2),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(10),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(40),
            height: heightPercentageToDP(2),
            marginTop: RFPercentage(2),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFPercentage(2),
          }}>
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFPercentage(2),
          }}>
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: RFPercentage(2),
          }}>
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
          <View
            style={{
              width: widthPercentageToDP(45),
              height: heightPercentageToDP(2),
              marginTop: RFPercentage(2),
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </JScreen>
  );
}

const styles = StyleSheet.create({});

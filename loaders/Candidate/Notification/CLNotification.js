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
export default function CLNotification() {
  return (
    <SkeletonPlaceholder speed="900" backgroundColor={colors.skeletonLoader[0]}>
     
      <View style={{ marginTop: RFPercentage(2), alignItems:'center',}}>
        {Array(7)
          .fill(null)
          .map((item, index) => (
             <View
        style={{
          flexDirection: 'row',
          marginTop: RFPercentage(2),
         
        }}>
        <View
          style={{
            width: widthPercentageToDP(92),
            height: heightPercentageToDP(10),
            marginHorizontal: RFPercentage(1),
          }}
        />
      </View>
          ))}
      </View>
     
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({});

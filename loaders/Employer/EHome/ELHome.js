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
export default function ELHome() {
  return (
    <SkeletonPlaceholder  speed="900" backgroundColor={colors.skeletonLoader[0]}>
        <View style={{ paddingHorizontal: RFPercentage(2),width:'100%'}}>
      <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop:RFPercentage(2),
        }}>
            
            <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(4),
            // marginHorizontal:RFPercentage(2)
          }}
        />
            <View
          style={{
            width: widthPercentageToDP(20),
            height: heightPercentageToDP(4),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(4),
            // marginHorizontal:RFPercentage(2)
          }}
        />
      </View>
     
            
        <View
          style={{
            width: widthPercentageToDP(90),
            height: heightPercentageToDP(5),
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: RFPercentage(3),
          }}
        />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: RFPercentage(2),
        }}>
       
      </View>
      <View style={{flexDirection: 'row',}}>
        {Array(6)
          .fill(null)
          .map((item, index) => (
            <View
              key={index}
              style={{
                width: RFPercentage(14),
                height: RFPercentage(14),
                marginRight: RFPercentage(1),
              }}
            />
          ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: RFPercentage(2),
        }}>
        <View
          style={{
            width: widthPercentageToDP(30),
            height: heightPercentageToDP(2),
          }}
        />
       
      </View>
      <View
          style={{ flexDirection: 'row',
          marginTop: RFPercentage(2),
            height: heightPercentageToDP(14),
          }}
        />
         <View
          style={{
            marginTop:RFPercentage(2),
            width: widthPercentageToDP(30),
            height: heightPercentageToDP(2),
          }}
        />
      <View
          style={{ flexDirection: 'row',
          marginTop: RFPercentage(2),
            height: heightPercentageToDP(14),
          }}
        />
      <View
          style={{ flexDirection: 'row',
          marginTop: RFPercentage(2),
            height: heightPercentageToDP(14),
          }}
        />
      <View
          style={{ flexDirection: 'row',
          marginTop: RFPercentage(2),
            height: heightPercentageToDP(14),
          }}
        />
      
     

     
</View>
    
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({});

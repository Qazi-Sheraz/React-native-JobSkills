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
export default function CLHome() {
  return (
    <SkeletonPlaceholder speed="900" backgroundColor={colors.skeletonLoader[0]}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: widthPercentageToDP(80),
            height: heightPercentageToDP(5),
            marginRight: RFPercentage(1),
          }}
        />
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(5),
          }}
        />
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
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(2),
          }}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: RFPercentage(2)}}>
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
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(2),
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: RFPercentage(2),
        }}>
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(14),
            marginRight: RFPercentage(1),
          }}
        />
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
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(2),
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: RFPercentage(2),
        }}>
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(14),
            marginRight: RFPercentage(1),
          }}
        />
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
        <View
          style={{
            width: widthPercentageToDP(10),
            height: heightPercentageToDP(2),
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: RFPercentage(2),
        }}>
        <View
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(14),
            marginRight: RFPercentage(1),
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({});

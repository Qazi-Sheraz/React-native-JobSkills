import {StyleSheet, View} from 'react-native';
import React from 'react';

import {observer} from 'mobx-react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../config/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
function CLFavouriteJob() {
  return (
    <SkeletonPlaceholder speed="900" backgroundColor={colors.skeletonLoader[0]}>
      <View
        style={{
          height: heightPercentageToDP(5),
          marginVertical: RFPercentage(3),
        }}
      />

      {Array(10)
        .fill(0)
        .map(item => (
          <View
            key={item}
            style={{
              height: heightPercentageToDP(14),
              marginTop: RFPercentage(1),
            }}
          />
        ))}
    </SkeletonPlaceholder>
  );
}

export default observer(CLFavouriteJob);

const styles = StyleSheet.create({});

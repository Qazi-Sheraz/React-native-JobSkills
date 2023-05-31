import {StyleSheet, Image} from 'react-native';
import React from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JGradientScreen from '../../customComponents/JGradientScreen';
import colors from '../../config/colors';
import { StatusBar } from 'react-native';

export default function SplashScreen() {
  return (
    <JGradientScreen style={styles.container}>
      <StatusBar backgroundColor={colors.purple[0]}/>
      <Image
        source={require('../../assets/images/logo/logo.png')}
        style={{
          height: heightPercentageToDP(40),
          width: widthPercentageToDP(40),
          tintColor: colors.white[0],
          resizeMode: 'contain',
        }}
      />
    </JGradientScreen>
  );
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
});

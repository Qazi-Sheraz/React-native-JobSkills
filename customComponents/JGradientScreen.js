import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';

export default function JGradientScreen({
  containerStyle,
  children,
  style,
  background = true,
  heading,
}) {
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        hidden={false}
        backgroundColor={colors.purple[0]}
        translucent
      />
      {heading}
      <ImageBackground
        style={styles.imageBackground}
        source={
          background == true
            ? require('../assets/images/gradient/bg_splash.jpeg')
            : null
        }
        resizeMode="cover">
        <LinearGradient
          colors={[
            '#9400ff90',
            background == true ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 1)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[styles.gradient, style]}>
          {children}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    // width: '100%',
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

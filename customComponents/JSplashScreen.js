import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import JScreen from './JScreen';
import JSkip from './JSkip';
import JCircularLogo from './JCircularLogo';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import JDots from './JDots';
import colors from '../config/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
export default function JSplashScreen({
  containerStyle,
  onSkipPress,
  heading,
  detail,
  onNextPress,
  onPreviousPress,

  slide,
  img,
}) {
  return (
    <JScreen style={containerStyle}>
      <JSkip
        containerStyle={{flex: 0.1}}
        fontColor={colors.black[0]}
        onPress={onSkipPress}
        children="Skip"
      />
      <View style={{alignItems: 'center', flex: 0.1}}>
        <JCircularLogo />
      </View>
      <Image
        style={{
          flex: 0.4,
          alignSelf: 'center',
          paddingTop: RFPercentage(2),
          height: RFPercentage(27),
          width: RFPercentage(27),
        }}
        resizeMode="contain"
        source={img}
      />
      <View style={{alignItems: 'center', flex: 0.2, justifyContent: 'center'}}>
        <JText style={styles.heading}>{heading}</JText>
        <JText style={styles.detail}>{detail}</JText>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <JDots slide={slide} />
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {slide !== 1 ? (
          <JSkip
            fontColor={colors.black[0]}
            onPress={onPreviousPress}
            children="Previous"
          />
        ) : (
          <View />
        )}
        <JSkip
          fontColor={colors.black[0]}
          onPress={onNextPress}
          children="Next"
        />
      </View>
    </JScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: RFPercentage(2),
    width: widthPercentageToDP(60),
    textAlign: 'center',
    fontWeight: '600',
  },
  detail: {
    fontSize: RFPercentage(1.8),
    width: widthPercentageToDP(60),
    textAlign: 'center',
    marginTop: RFPercentage(1),
  },
});

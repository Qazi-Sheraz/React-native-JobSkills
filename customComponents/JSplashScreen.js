import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import JRow from './JRow';
import JText from './JText';
import JDots from './JDots';
import JSkip from './JSkip';
import JScreen from './JScreen';
import colors from '../config/colors';
import JChevronIcon from './JChevronIcon';
import {StoreContext} from '../mobx/store';
import JCircularLogo from './JCircularLogo';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default function JSplashScreen({
  img,
  svg,
  count,
  slide,
  detail,
  heading,
  onSkipPress,
  onNextPress,
  containerStyle,
  onPreviousPress,
}) {
  const store = useContext(StoreContext);
  return (
    <JScreen style={containerStyle}>
      <JRow style={styles.header}>
        <JChevronIcon color={colors.black[0]} />
        <JSkip
          children={store.lang.Skip}
          onPress={onSkipPress}
          fontColor={colors.black[0]}
        />
      </JRow>

      <View style={{alignItems: 'center', flex: 0.1}}>
        <JCircularLogo />
      </View>
      <View
        style={{
          flex: 0.4,
          alignSelf: 'center',
          // backgroundColor:"red",
          justifyContent: 'center',
          paddingTop: RFPercentage(4),
          // height: RFPercentage(27),
          // width: RFPercentage(30),
        }}>
        {svg}
      </View>
      {/* <Image
        style={{
          flex: 0.4,
          alignSelf: 'center',
          paddingTop: RFPercentage(2),
          height: RFPercentage(27),
          width: RFPercentage(27),
        }}
        resizeMode="contain"
        source={img}
      /> */}
      <View style={{alignItems: 'center', flex: 0.2, justifyContent: 'center'}}>
        <JText style={styles.heading}>{heading}</JText>
        <JText style={styles.detail}>{detail}</JText>
      </View>
      <JRow
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <JDots slide={slide} count={count} />
      </JRow>
      <JRow
        style={{
          flex: 0.1,
          justifyContent: 'space-between',
        }}>
        {slide !== 1 ? (
          <JSkip
            fontColor={colors.black[0]}
            onPress={onPreviousPress}
            children={store.lang.previous}
          />
        ) : (
          <View />
        )}
        <JSkip
          fontColor={colors.black[0]}
          onPress={onNextPress}
          children={store.lang.next}
        />
      </JRow>
    </JScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: RFPercentage(2),
  },
  heading: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
    width: widthPercentageToDP(70),
    textAlign: 'center',
    // fontWeight: '600',
  },
  detail: {
    fontSize: RFPercentage(2),
    width: widthPercentageToDP(80),
    textAlign: 'center',
    marginTop: RFPercentage(1),
  },
});

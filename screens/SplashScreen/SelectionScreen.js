import { StyleSheet, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import JGradientScreen from '../../customComponents/JGradientScreen';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import SelectionSheet from './SelectionSheet';
// import JSkip from '../../customComponents/JSkip';

export default function SelectionScreen({ navigation }) {

  return (
    <JGradientScreen >
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo/logo.png')}
          style={{
            height: heightPercentageToDP(30),
            width: widthPercentageToDP(30),
            tintColor: colors.white[0],
            resizeMode: 'contain',
          }}
        />
      </View>
      <SelectionSheet navigation={navigation} />
    </JGradientScreen>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet, Image, View} from 'react-native';
import React ,{useEffect} from 'react';
import JGradientScreen from '../../customComponents/JGradientScreen';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import { BackHandler } from 'react-native';
import SelectionSheet from './SelectionSheet';
import { StatusBar } from 'react-native';
// import JSkip from '../../customComponents/JSkip';

export default function SelectionScreen({navigation}) {
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

  // const handleBackButton = () => {
  //   // Add your custom logic here to handle the back button press
  //   // For example, you can show a confirmation dialog or prevent the navigation entirely

  //   // To prevent the default behavior and disable back navigation:
  //   return true;
  // };
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

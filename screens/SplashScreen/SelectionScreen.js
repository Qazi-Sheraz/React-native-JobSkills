import {StyleSheet, Image, View, Platform} from 'react-native';
import React, {useContext, useEffect} from 'react';
import JGradientScreen from '../../customComponents/JGradientScreen';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import SelectionSheet from './SelectionSheet';
import JText from '../../customComponents/JText';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from '../../customComponents/JRow';
import {StoreContext} from '../../mobx/store';
// import JSkip from '../../customComponents/JSkip';

export default function SelectionScreen({navigation}) {
  const store = useContext(StoreContext);
  console.log(store.authType)
  return (
    <JGradientScreen>
      <View style={styles.logo}>
     { store.authType==false &&
          <JRow style={{width: '90%', marginTop: RFPercentage(-5)}}>
            <JChevronIcon size={3.5} />
          </JRow>}
      
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

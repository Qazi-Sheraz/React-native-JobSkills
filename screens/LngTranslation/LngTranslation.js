import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import JGradientScreen from '../../customComponents/JGradientScreen';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import JRow from '../../customComponents/JRow';
import JButton from '../../customComponents/JButton';

const LngTranslation = () => {
  const store = useContext(StoreContext);
  return (
    <JGradientScreen style={{justifyContent: 'space-between'}}>
      
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo/logo.png')}
          style={{
            height: heightPercentageToDP(40),
            width: widthPercentageToDP(40),
            tintColor: colors.white[0],
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={styles.view}>
        <View>
          <JText
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(3),
              textAlign: 'center',
             
            }}>
            {store.lang.Choose_language}
          </JText>
          <JText style={{fontSize: RFPercentage(2.5), textAlign: 'center', marginVertical: RFPercentage(1.5),}}>
            {store.lang.langButtons}
          </JText>
        </View>
        <JRow style={{borderWidth:RFPercentage(0.1)}}>
          <JButton style={styles.btn} >English</JButton>
          <JButton style={styles.btn}>Urdu</JButton>
          <JButton style={styles.btn}>Arabic</JButton>
        </JRow>
      </View>
    </JGradientScreen>
  );
};

export default LngTranslation;

const styles = StyleSheet.create({
  logo: {
    height:RFPercentage(100),
    justifyContent: 'center',
    marginTop: RFPercentage(-20),
    alignItems: 'center',
  },
  view:{
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: RFPercentage(40),
    padding: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },
  btn:{paddingHorizontal:RFPercentage(4),}
});

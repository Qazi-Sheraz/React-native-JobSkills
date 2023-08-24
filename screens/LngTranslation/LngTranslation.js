import {StyleSheet, Image, View, StatusBar} from 'react-native';
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
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../config/url';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
const LngTranslation = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation();
const[btn,setBtn]=useState(false);
const[btn2,setBtn2]=useState(false);

 
 

  const handleSave = async lang => {
 // Switch to the selected language

    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      await AsyncStorage.setItem('splash', 'true');
      store.setLang(lang);
      store.setLangType('true');
     
      setTimeout(() => {
         store.setIsRefreshing(!store.isRefreshing);
        // console.log(store.isRefreshing);
        // setStat(!stat)
      }, 2000);
    
      // console.log(lang)
    } catch (error) {
      // console.log('Error storing language:', error);
    }
  };
   
useEffect(() => {
 
}, [store.isRefreshing])
  return (
    
    <JGradientScreen style={{justifyContent: 'space-between'}}>
      {/* <StatusBar backgroundColor={'transparent'} translucent/> */}
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
      <Animatable.View style={styles.sheetContainer} animation="slideInUp">
      <View
        style={styles.view}>
        <View>
          <JText
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(2.5),
              textAlign: 'center',
             
            }}>
            {store.lang.Choose_language}
          </JText>
          <JText style={{fontSize: RFPercentage(2), textAlign: 'center', marginVertical: RFPercentage(1.5),}}>
            {store.lang.langButtons}
          </JText>
        </View>
        <JRow  style={{borderWidth:RFPercentage(0.1)}}>
          <JButton onPress={()=>{
            setBtn(true)
            setBtn2(false)
              handleSave('en');
           }}
            style={{paddingHorizontal:RFPercentage(6),backgroundColor:btn === false?colors.primary[0]:'#fff',borderColor:btn === false?colors.primary[0]:colors.border[0]}} >English</JButton>
          {/* <JButton onPress={()=>{handleSave('ur')}} style={{paddingHorizontal:RFPercentage(4),backgroundColor:store.lang === 'ur'?'#fff':colors.primary[0]}}>اردو</JButton> */}
          <JButton onPress={()=>{
            setBtn2(true)
            setBtn(false)
            handleSave('ar');}} style={{paddingHorizontal:RFPercentage(6),backgroundColor:btn2=== true?colors.primary[0]:'#fff',borderColor:btn === true?colors.primary[0]:colors.border[0]}}>العربية</JButton>
        </JRow>
      </View>
      </Animatable.View>
    </JGradientScreen>
  );
};

export default observer(LngTranslation);

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
    height: RFPercentage(35),
    padding: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },
  btn:{paddingHorizontal:RFPercentage(4)},
  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

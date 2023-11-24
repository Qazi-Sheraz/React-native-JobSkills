import { StyleSheet, Image, StatusBar, Platform } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JGradientScreen from '../../customComponents/JGradientScreen';
import colors from '../../config/colors';
import messaging from '@react-native-firebase/messaging';
import { StoreContext } from '../../mobx/store';
import JText from '../../customComponents/JText';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SplashScreen() {
  const store = useContext(StoreContext)
  // const requestUserPermission = async () => {
  //   /**
  //    * On iOS, messaging permission must be requested by
  //    * the current application before messages can be
  //    * received or sent
  //    */
  //   const authStatus = await messaging().requestPermission();
  //   //console.log('Authorization status(authStatus):', authStatus);
  //   return (
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //   );
  // };
  // const [deviceName, setDeviceName] = useState('');
  // // console.log(deviceName)

  // const _getlangApi = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   fetch(`${url.baseUrl}/get-language`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       // console.log(result)
  //       handleSave(result)
  //     })
  //     .catch(error => console.log('error', error));
  // };
  // const handleSave = async lang => {
  //   // Switch to the selected language

  //   try {
  //     await AsyncStorage.setItem('selectedLanguage', lang);
  //     store.setLang(lang);

  //     console.log('lang', lang)
  //   } catch (error) {
  //     console.log('Error storing language:', error);
  //   }
  // };
  // useEffect(() => {
  //   store.token?.token && _getlangApi()
  //   const fetchDeviceName = async () => {

  //     try {
  //       const name = await DeviceInfo.getDeviceName();
  //       store.setDeviceName(name);
  //     } catch (error) {
  //       console.log('Error fetching device name:', error);
  //     }
  //   };

  //   fetchDeviceName();
  // }, []);

  // // console.log('DeviceInfo', deviceName)


  return (
    <JGradientScreen style={styles.container}>

      {/* <StatusBar backgroundColor={'transparent'} translucent/> */}
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
  container: { justifyContent: 'center', alignItems: 'center' },
});

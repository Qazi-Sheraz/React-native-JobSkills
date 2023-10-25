import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../mobx/store';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import LngTranslation from '../../screens/LngTranslation/LngTranslation';
import { observer } from 'mobx-react';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import BoundingScreenStart from '../../screens/SplashScreen/Candidate/BoundingScreenStart';
import PermissionScreen from '../../screens/SplashScreen/PermissionScreen';
const Stack = createStackNavigator();

const LangStack = () => {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const _getoken = token => {
    AsyncStorage.getItem(token)
      .then(res => {
        // console.log("resssssssss",res);
        store.setToken(JSON.parse(res));
        store.setUserInfo(store.token?.user);

        setTimeout(() => {
          setLoader(false);
        }, 5000);

      })
      .catch(error => {
        // console.log('Error in LangStack', error);

        setLoader(false);
      });
  };
  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    //console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };


  // useEffect(() => {
  //   // requestUserPermission()
  //   const fetchDeviceName = async () => {
  //     try {
  //       const name = await DeviceInfo.getDeviceName();
  //       store.setDeviceName(name);
  //     } catch (error) {
  //       console.log('Error fetching device name:', error);
  //     }
  //   };

  //   fetchDeviceName();
  //   if (requestUserPermission()) {
  //     /**
  //      * Returns an FCM token for this device
  //      */
  //     messaging()
  //       .getToken()
  //       .then(fcmToken => {
  //         // console.log('FCM Token -> ', fcmToken);
  //         var formdata = new FormData();
  //         formdata.append("token", fcmToken);
  //         formdata.append("name", store.deviceName);
  //         formdata.append("os", Platform.OS)
  //         formdata.append("version", Platform.Version);
  //         var requestOptions = {
  //           method: 'POST',
  //           body: formdata,
  //           redirect: 'follow'
  //         };
  //         fetch("https://dev.jobskills.digital/api/device-token", requestOptions)
  //           .then(response => response.json())
  //           .then(result =>
  //             // console.log('resulttttttttttttttt',result)
  //             ''
  //           )
  //           .catch(error => console.log('error', error));

  //       });

  //     messaging()
  //       .onTokenRefresh((newToken) => {
  //         console.log('Updated FCM Token -> ', newToken);

  //       })


  //   };
  //   _getoken('@Login');
  //   return () => { };

  // }, [loader]);
  useEffect(() => {

    _getoken('@Login');
    return () => { };

  }, [loader]);


  return (
    loader === true ? (
      <LogoScreen />
    ) : (
      <React.Fragment>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName={'LngTranslation'}>
          <Stack.Screen name="LngTranslation" component={LngTranslation} />
          <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
          <Stack.Screen name="BoundingScreenStart" component={BoundingScreenStart} />
        </Stack.Navigator>
      </React.Fragment>
    )
  )
}

export default observer(LangStack);

const styles = StyleSheet.create({})
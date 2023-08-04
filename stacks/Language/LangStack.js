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
  useEffect(() => {
    const fetchDeviceName = async () => {
      try {
        const name = await DeviceInfo.getDeviceName();
        store.setDeviceName(name);
      } catch (error) {
        console.log('Error fetching device name:', error);
      }
    };

    fetchDeviceName();
  }, []);
  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
          var formdata = new FormData();
          formdata.append("token", fcmToken);
          formdata.append("name", store.deviceName);
          formdata.append("os", Platform.OS)
          formdata.append("version", Platform.Version);
          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };
          fetch("https://dev.jobskills.digital/api/device-token", requestOptions)
            .then(response => response.json())
            .then(result => console.log('resulttttttttttttttt',result))
            .catch(error => console.log('error', error));

        });

      messaging()
        .onTokenRefresh((newToken) => {
          console.log('Updated FCM Token -> ', newToken);
          
        })

  //   } else
  //     // console.log('Not Authorization status:', authStatus);

  //     /**
  //      * When a notification from FCM has triggered the application
  //      * to open from a quit state, this method will return a
  //      * `RemoteMessage` containing the notification data, or
  //      * `null` if the app was opened via another method.
  //      */

  //     messaging()
  //       .getInitialNotification()
  //       .then(async remoteMessage => {
  //         console.log('initialMessage',remoteMessage)
  //         if (remoteMessage){
  //         if (remoteMessage.data?.type === 'candidate-details') {
  //           navigation.navigate('ProfileApplication', {
  //             candidate_id: remoteMessage.data?.candidate_id,
  //           });
  //         }
  //         else{
  //           navigation.navigate('JobDetails', {
  //             id: remoteMessage.data && remoteMessage.data?.job_id,
  //           });
  //         }
  //       }
  //       });

  //   /**
  //    * When the user presses a notification displayed via FCM,
  //    * this listener will be called if the app has opened from
  //    * a background state. See `getInitialNotification` to see
  //    * how to watch for when a notification opens the app from
  //    * a quit state.
  //    */
  //   messaging().onNotificationOpenedApp(async remoteMessage => {
  //     if (remoteMessage) {
  //       // console.log(
  //       //   'onNotificationOpenedApp: ' +
  //       //     'Notification caused app to open from background state',
  //       // );
  //       // console.log(remoteMessage);
  //       // alert(
  //       //   'onNotificationOpenedApp: Notification caused app to' +
  //       //     ' open from background state',
  //       // );

  //       onMessageReceived(remoteMessage);
  //     }
  //   });

  //   /**
  //    * Set a message handler function which is called when
  //    * the app is in the background or terminated. In Android,
  //    * a headless task is created, allowing you to access the
  //    * React Native environment to perform tasks such as updating
  //    * local storage, or sending a network request.
  //    */
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     // onMessageReceived(remoteMessage);
  //     console.log('BMessage',remoteMessage)
  //     if (remoteMessage){
  //     if (remoteMessage.data?.type === 'candidate-details') {
  //       navigation.navigate('ProfileApplication', {
  //         candidate_id: remoteMessage.data?.candidate_id,
  //       });
  //     }
  //     else{
  //       navigation.navigate('JobDetails', {
  //         id: remoteMessage.data && remoteMessage.data?.job_id,
  //       });
  //     }
  //   }
  //   });

  //   /**
  //    * When any FCM payload is received, the listener callback
  //    * is called with a `RemoteMessage`. Returns an unsubscribe
  //    * function to stop listening for new messages.
  //    */
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     if (remoteMessage) {
  //       onMessageReceived(remoteMessage);
  //     }
  //   });

  //   /**
  //    * Apps can subscribe to a topic, which allows the FCM
  //    * server to send targeted messages to only those devices
  //    * subscribed to that topic.
  //    */

  //   return () => {
  //     unsubscribe;
  //     /**
  //      * Unsubscribe the device from a topic.
  //      */
  //     // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);
  // const onMessageReceived = async remoteMessage => {
  //   console.log('remoteMessage',remoteMessage)
  //   if (remoteMessage) {
  //     // setModalVisible(true)
  //     // JToast({
  //     //   type: 'success',
  //     //   text1: remoteMessage.notification.title,
  //     //   text2:remoteMessage.notification.body,
  //     //   visibilityTime:2500,
  //     // });
  //     // Alert.alert(
  //     //   remoteMessage.notification.title,
  //     //   remoteMessage.notification.body,
  //     //   [
  //     //     {
  //     //       text: 'Cancel',
  //     //       // onPress: () => console.log('Cancel Pressed'),
  //     //       style: 'cancel',
  //     //     },
  //     //     {
  //     //       text: 'Visit',
  //     //       onPress: () => {
  //     //         navigation.navigate('JobDetails', {
  //     //           id: remoteMessage.data && remoteMessage.data.id,
  //     //         });
  //     //       },
  //     //     },
  //     //   ],
  //     // );

  //   }
  // };
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
        </Stack.Navigator>
      </React.Fragment>
    )
  )
}

export default observer(LangStack);

const styles = StyleSheet.create({})
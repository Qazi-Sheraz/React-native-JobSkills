import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CHomeStack from '../stacks/Candidate/CHomeStack';
import CustomDrawerContent from './CustomDrawerContent';
// import EDrawerContent from './EDrawerContent';
import EmployeStack from '../stacks/Employee/EmployeStack';
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
import AuthStack from '../stacks/Auth/AuthStack';
import { Observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LangStack from '../stacks/Language/LangStack';
import EAccountSetting from '../escreen/edrawer/EAccountSetting';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import JobDetails from '../escreen/Jobs/JobDetails';
export default function MyDrawer() {
  const navigation = useNavigation();
  useEffect(() => {

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {

        if (remoteMessage) {
            if(remoteMessage.data?.type=='candidate-details'){
            navigation.navigate('ProfileApplication', {
              candidate_id: remoteMessage.data && remoteMessage.data?.candidate_id,
            });}
            else{
              navigation.navigate('JobDetails', {
                id: remoteMessage.data &&remoteMessage.data?.job_id,
              });
            
          }

          console.log('initialMessageeeeeeeeee', remoteMessage)
          // alert('hellooooo')
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        if(remoteMessage.data?.type=='candidate-details'){
          navigation.navigate('ProfileApplication', {
            candidate_id: remoteMessage.data && remoteMessage.data?.candidate_id,
          });}
          else{
            navigation.navigate('JobDetails', {
              id: remoteMessage.data &&remoteMessage.data?.job_id,
            });
          
        }

      }
      // if (remoteMessage) {
      //   console.log(
      //     'onNotificationOpenedApp: ' +
      //     'Notification caused app to open from background state', remoteMessage
      //   );

      //   alert(
      //     'onNotificationOpenedApp: Notification caused app to' +
      //     ' open from background state',
      //   );

      //   // onMessageReceived(remoteMessage);
      // }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // onMessageReceived(remoteMessage);

      if (remoteMessage) {
        if(remoteMessage.data?.type=='candidate-details'){
          navigation.navigate('ProfileApplication', {
            candidate_id: remoteMessage.data && remoteMessage.data?.candidate_id,
          });}
          else{
            navigation.navigate('JobDetails', {
              id: remoteMessage.data &&remoteMessage.data?.job_id,
            });
          
        }

      }
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        onMessageReceived(remoteMessage);

      }
    });

    // /**
    //  * Apps can subscribe to a topic, which allows the FCM
    //  * server to send targeted messages to only those devices
    //  * subscribed to that topic.
    //  */

    // return () => {
    //   unsubscribe;
    //   /**
    //    * Unsubscribe the device from a topic.
    //    */
    //   // messaging().unsubscribeFromTopic(TOPIC);
    // };
  }, []);
  const onMessageReceived = async remoteMessage => {
    console.log('remoteMessage', remoteMessage)
    if (remoteMessage) {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Visit',
            onPress: () => {
              if(remoteMessage.data?.type=='candidate-details'){
              navigation.navigate('ProfileApplication', {
                candidate_id: remoteMessage.data && remoteMessage.data?.candidate_id,
              });}
              else{
                navigation.navigate('JobDetails', {
                  id: remoteMessage.data &&remoteMessage.data?.job_id,
                });
              }
            },
          },
        ],
      );

    }
  };


  const store = useContext(StoreContext);
  const Drawer = createDrawerNavigator();
  const [loader, setLoader] = useState(true);


  const _getLang = async () => {
    try {

      const _store = await AsyncStorage.multiGet(['selectedLanguage', 'splash'])
      // console.log(_store[0][1])
      // console.log(_store[1][1])
      _store[0][1] != null ? store?.setLang(_store[0][1]) : store?.setLang('en')
      _store[1][1] != null ? store?.setLangType(_store[1][1]) : store?.setLangType('false')

    } catch (error) {
      // console.log('Error retrieving stored language:', error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    _getLang('selectedLanguage');
    return () => { };
  }, []);



  return (
    <Observer>
      {() =>
        store.langType == 'false' && !store?.token ? (
          <LangStack />

        ) : store.langType == 'true' && !store?.token ? (
          <AuthStack />
        )
          : store.token?.user?.owner_type.includes('Candidate') ? (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                // drawerPosition: store.lang.id == 0 ? 'left' : 'right',
              }}
              initialRouteName={'CHome'}
              drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="CHomeStack" component={CHomeStack} />
              <Drawer.Screen name="JobDetails" component={JobDetails} />

            </Drawer.Navigator>
          ) : (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                // drawerPosition: store.lang.id == 0 ? 'left' : 'right',
              }}
              initialRouteName={'CHome'}
              drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="EHomeStack" component={EmployeStack} />
              <Drawer.Screen name="JobDetails" component={JobDetails} />
            </Drawer.Navigator>
          )
      }
    </Observer>
  );
}

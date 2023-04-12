import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CBottomTab from '../../screens/Home/CBottomTab';
import CGeneralInformation from '../../screens/Home/ProfileScreen/CGeneralInformation';
import CExperienceInformation from '../../screens/Home/ProfileScreen/CExperienceInformation';
import CContactInformation from '../../screens/Home/ProfileScreen/CContactInformation';
import Login from '../../screens/Login/Login';
import Registration from '../../screens/Registration/Registration';
import SelectionScreen from '../../screens/SplashScreen/SelectionScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import VerifiedEmail from '../../screens/VerifiedEmail/VerifiedEmail';
import SelectedJob from '../../screens/Home/SelectedJob/SelectedJob';
import SelectedCompany from '../../screens/Home/SelectedCompany/SelectedCompany';
import AllJobs from '../../screens/Home/AllJobs/AllJobs';
import FeatureCompany from '../../screens/Home/FeatureCompany/FeatureCompany';
import FeatureJob from '../../screens/Home/FeatureJob/FeatureJob';
import CSearch from '../../screens/Home/Search/CSearch';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import Followings from '../../screens/Drawer/Followings';
import JobAlert from '../../screens/Drawer/JobAlert';
import HelpCenter from '../../screens/Drawer/HelpCenter';
import CFilter from '../../screens/Home/Search/CFilter';
import EBottomTab from '../../escreen/Home/EBottomTab';
import JobDetails from '../../escreen/Jobs/JobDetails';
import AddNew_Job from '../../escreen/Jobs/AddNew_Job';
import JobApplication from '../../escreen/Jobs/JobApplication';
import ProfileJobApplication from '../../escreen/Jobs/ProfileJobApplication';
import EditProfile from '../../screens/Home/ProfileScreen/EditProfile';
import Notification from '../../screens/Notification/Notification';
import Followers from '../../escreen/edrawer/Followers';
import Applicants from '../../escreen/edrawer/Applicants';
import EAccountSetting from '../../escreen/edrawer/EAccountSetting';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import ChangeLanguage from '../../screens/ChangeLanguage/ChangeLanguage';
import Transaction from '../../escreen/edrawer/AccountSettings/Transaction';
import Employes from '../../escreen/edrawer/Employes';
import JobPreference from '../../escreen/Jobs/JobPreference';
import JobRequirement from '../../escreen/Jobs/JobRequirement';
import VerifiedPhone from '../../screens/VerifiedPhone/VerifiedPhone';
import Assessments from '../../escreen/edrawer/Assessments';

const Stack = createStackNavigator();

function CHomeStack({navigation}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);

  const _getoken = token => {
    AsyncStorage.getItem(token)
      .then(res => {
        console.log(res);
        store.setToken(JSON.parse(res));
        store.setUserInfo(store.token.user);

        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error while getting token',
        });

        setLoader(false);
      });
  };
  useEffect(() => {
    _getoken('@login');

    return () => {};
  }, []);

  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else console.log('Not Authorization status:', authStatus);

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          if (remoteMessage) {
            onMessageReceived(remoteMessage);
          }
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
        // console.log(
        //   'onNotificationOpenedApp: ' +
        //     'Notification caused app to open from background state',
        // );
        // console.log(remoteMessage);
        // alert(
        //   'onNotificationOpenedApp: Notification caused app to' +
        //     ' open from background state',
        // );

        onMessageReceived(remoteMessage);
      }
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
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        onMessageReceived(remoteMessage);
      }
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  const onMessageReceived = async remoteMessage => {
    if (remoteMessage) {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Visit',
            onPress: () => {
              navigation.navigate('CSelectedJob', {
                id: remoteMessage.data && remoteMessage.data.id,
              });
            },
          },
        ],
      );
    }
  };

  return loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // gestureEnabled: false,
        }}
        initialRouteName={store?.token?.token ? 'CHome' : 'SelectionScreen'}>
          
        <Stack.Screen name="CHome" component={EBottomTab} />
        <Stack.Screen name="Assessments" component={Assessments} />
        <Stack.Screen name="CAllJobs" component={AllJobs} />
        <Stack.Screen name="CFeatureCompany" component={FeatureCompany} />
        <Stack.Screen name="CFeatureJob" component={FeatureJob} />
        <Stack.Screen name="CSelectedJob" component={SelectedJob} />
        <Stack.Screen name="CSelectedCompany" component={SelectedCompany} />
        <Stack.Screen name="CSearch" component={CSearch} />
        <Stack.Screen name="CFilter" component={CFilter} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
        <Stack.Screen name="AddNew_Job" component={AddNew_Job} />
        <Stack.Screen name="JobPreference" component={JobPreference} />
        <Stack.Screen name="JobRequirement" component={JobRequirement} />
        <Stack.Screen name="JobApplication" component={JobApplication} />
        <Stack.Screen name="ProfileApplication" component={ProfileJobApplication} />
        <Stack.Screen name="CEditProfile" component={EditProfile} />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="Applicants" component={Applicants} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Employes" component={Employes} />
        

        <Stack.Screen
          name="CContacttInformation"
          component={CContactInformation}
        />
        <Stack.Screen
          name="CGeneralInformation"
          component={CGeneralInformation}
        />
        <Stack.Screen
          name="CExperienceInformation"
          component={CExperienceInformation}
        />

        {/* AUTHENTICATION */}
        <Stack.Screen name="CNotification" component={Notification} />
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
        <Stack.Screen name="CVerifiedEmail" component={VerifiedEmail} />
        <Stack.Screen name="CLogin" component={Login} />
        <Stack.Screen name="CRegister" component={Registration} />
        <Stack.Screen name="EAccountSetting" component={EAccountSetting} />
        <Stack.Screen name="DFollowings" component={Followings} />
        <Stack.Screen name="DJobAlert" component={JobAlert} />
        <Stack.Screen name="DHelpCenter" component={HelpCenter} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
        <Stack.Screen name="VerifiedPhone" component={VerifiedPhone} />
        {/* <Stack.Screen name="VerifiedEmail" component={VerifiedEmail} /> */}
      </Stack.Navigator>
    </React.Fragment>
  );
}
export default observer(CHomeStack);

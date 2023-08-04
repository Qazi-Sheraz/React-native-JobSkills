import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CBottomTab from '../../screens/Home/CBottomTab';
import CGeneralInformation from '../../screens/Home/ProfileScreen/CGeneralInformation';
import CExperienceInformation from '../../screens/Home/ProfileScreen/CExperienceInformation';
import CContactInformation from '../../screens/Home/ProfileScreen/CContactInformation';
import Login from '../../screens/Login/Login';
import Registration from '../../screens/Registration/Registration';
import SelectionScreen from '../../screens/SplashScreen/SelectionScreen';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
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
import { Alert, Platform } from 'react-native';
import AccountSetting from '../../screens/Drawer/AccountSetting';
import Followings from '../../screens/Drawer/Followings';
import JobAlert from '../../screens/Drawer/JobAlert';
import HelpCenter from '../../screens/Drawer/HelpCenter';
import CFilter from '../../screens/Home/Search/CFilter';
import Resume from '../../screens/Home/ProfileScreen/Resume';
import CareerInformation from '../../screens/Home/ProfileScreen/CareerInformation';
import Assessment from '../../screens/Home/ProfileScreen/Assessment';
import Profile from '../../screens/Home/Profile';
import EditProfile from '../../screens/Home/ProfileScreen/EditProfile';
import Notification from '../../screens/Notification/Notification';
import EAccountSetting from '../../escreen/edrawer/EAccountSetting';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import ChangeLanguage from '../../screens/ChangeLanguage/ChangeLanguage';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JobDetails from '../../escreen/Jobs/JobDetails';
import CSocialMediaLink from '../../screens/Home/ProfileScreen/CSocialMediaLink';
import ESearch from '../../escreen/Jobs/ESearch';
import DeviceInfo from 'react-native-device-info';
import JModal from '../../customComponents/JModal';
import { JToast } from '../../functions/Toast';

const Stack = createStackNavigator();

function CHomeStack({ navigation }) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const _getoken = token => {
    AsyncStorage.getItem(token)
      .then(res => {
        // console.log('Response', res);
        store.setToken(JSON.parse(res));
        store.setUserInfo(store.token?.user);

        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch(error => {
        // console.log('Error in CHomeStack', error);
        setLoader(false);
      });
  };
  useEffect(() => {
    _getoken('@login');

    return () => { };
  }, []);

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
  // useEffect(() => {
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

  // useEffect(() => {

  //   if (requestUserPermission()) {
  //     /**
  //      * Returns an FCM token for this device
  //      */
  //     messaging()
  //       .getToken()
  //       .then(fcmToken => {
  //         console.log('FCM Token -> ', fcmToken);
  //         var formdata = new FormData();
  //         formdata.append("user_id", store.userInfo?.id);
  //         formdata.append("token", fcmToken);
  //         formdata.append("name", store.deviceName);
  //         formdata.append("os", Platform.OS);
  //         formdata.append("version", Platform.Version);
  //         var requestOptions = {
  //           method: 'POST',
  //           body: formdata,
  //           redirect: 'follow'
  //         };
  //         fetch("https://dev.jobskills.digital/api/device-token-update", requestOptions)
  //           .then(response => response.json())
  //           .then(result => console.log('result', result))
  //           .catch(error => console.log('error', error));

  //       });

  //     messaging()
  //       .onTokenRefresh((newToken) => {
  //         console.log('Updated FCM Token -> ', newToken);


  //       })

  //   } 
 
  // }, []);

  // const onMessageReceived = async remoteMessage => {
  //   console.log('remoteMessage', remoteMessage)
  //   if (remoteMessage) {
  //     // setModalVisible(true)
  //     // JToast({
  //     //   type: 'success',
  //     //   text1: remoteMessage.notification.title,
  //     //   text2:remoteMessage.notification.body,
  //     //   visibilityTime:2500,
  //     // });
  //     Alert.alert(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //       [
  //         {
  //           text: 'Cancel',
  //           // onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Visit',
  //           onPress: () => {
  //             if (remoteMessage.data?.type === 'job-details') {
  //               navigation.navigate('CJobDetails', {
  //                 id: remoteMessage.data?.job_id,
  //               });
  //             }

  //           },
  //         },
  //       ],
  //     );

  //   }
  // };

  return loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      {store?.token?.token ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName={'CHome'}>
          <Stack.Screen name="CHome" component={CBottomTab} />
          <Stack.Screen name="CAllJobs" component={AllJobs} />
          <Stack.Screen name="CFeatureCompany" component={FeatureCompany} />
          <Stack.Screen name="CFeatureJob" component={FeatureJob} />
          <Stack.Screen name="CSelectedJob" component={SelectedJob} />
          <Stack.Screen name="JobDetails" component={JobDetails} />
          <Stack.Screen name="CSelectedCompany" component={SelectedCompany} />
          <Stack.Screen name="CSearch" component={CSearch} />
          <Stack.Screen name="ESearch" component={ESearch} />
          <Stack.Screen name="CFilter" component={CFilter} />
          <Stack.Screen name="CEditProfile" component={EditProfile} />
          <Stack.Screen name="CSocialMediaLink" component={CSocialMediaLink} />
          <Stack.Screen
            name="CContacttInformation"
            component={CContactInformation}
          />
          <Stack.Screen
            name="CGeneralInformation"
            component={CGeneralInformation}
          />
          <Stack.Screen name="Aboutme" component={Profile} />
          <Stack.Screen name="Resume" component={Resume} />
          <Stack.Screen
            name="CareerInformation"
            component={CareerInformation}
          />
          <Stack.Screen name="Assessment" component={Assessment} />
          <Stack.Screen name="EAccountSetting" component={EAccountSetting} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
          {/* AUTHENTICATION */}
          <Stack.Screen name="CNotification" component={Notification} />
          <Stack.Screen name="VerifiedEmail" component={VerifiedEmail} />

          <Stack.Screen name="DAccountSetting" component={AccountSetting} />
          <Stack.Screen name="DFollowings" component={Followings} />

          <Stack.Screen name="DJobAlert" component={JobAlert} />
          <Stack.Screen name="DHelpCenter" component={HelpCenter} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName={'SelectionScreen'}>
          <Stack.Screen name="SelectionScreen" component={SelectionScreen} />

          <Stack.Screen name="CLogin" component={Login} />
          <Stack.Screen name="CRegister" component={Registration} />
        </Stack.Navigator>
      )}
    </React.Fragment>

  );
}
export default observer(CHomeStack);

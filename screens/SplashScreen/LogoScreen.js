import {StyleSheet, Image,StatusBar, Platform} from 'react-native';
import React ,{ useEffect,useState,useContext } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JGradientScreen from '../../customComponents/JGradientScreen';
import colors from '../../config/colors';
import messaging from '@react-native-firebase/messaging';
import { StoreContext } from '../../mobx/store';
export default function SplashScreen() {
  const store =useContext(StoreContext)
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
  const [deviceName, setDeviceName] = useState('');
  console.log(deviceName)
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

  // console.log('DeviceInfo', deviceName)

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
          formdata.append("user_id", store.userInfo?.id);
          formdata.append("token", fcmToken);
          formdata.append("name", store.deviceName);
          formdata.append("os", Platform.OS);
          formdata.append("version", Platform.Version);
          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };
          fetch("https://dev.jobskills.digital/api/device-token-update", requestOptions)
            .then(response => response.json())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));

        });

      messaging()
        .onTokenRefresh((newToken) => {
          console.log('Updated FCM Token -> ', newToken);


        })

    } 
 
  }, []);
  return (
    <JGradientScreen style={styles.container}>
      <StatusBar backgroundColor={colors.purple[0]}/>
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
  container: {justifyContent: 'center', alignItems: 'center'},
});

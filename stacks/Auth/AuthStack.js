import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login/Login';
import Registration from '../../screens/Registration/Registration';
import SelectionScreen from '../../screens/SplashScreen/SelectionScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import ForgetPassword from '../../screens/forgetPassword/ForgetPassword';
import VerifiedEmail from '../../screens/VerifiedEmail/VerifiedEmail';
import ResetLoginPassword from '../../screens/forgetPassword/ResetLoginPassword';
import DeviceInfo from 'react-native-device-info';
import FirstScreen from '../../screens/SplashScreen/Candidate/FirstScreen';
import EFirstScreen from '../../screens/SplashScreen/Employee/EFirstScreen';
import LngTranslation from '../../screens/LngTranslation/LngTranslation';

const Stack = createStackNavigator();

function AuthStack({navigation}) {
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
        }, 2000);
      })
      .catch(error => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _getoken('@login');

    return () => {};
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('authVal', 'true');
    const fetchDeviceName = async () => {
      try {
        const name = await DeviceInfo.getDeviceName();
        store.setDeviceName(name);
      } catch (error) {
        // console.log('Error fetching device name:', error);
      }
    };

    fetchDeviceName();
  }, []);

  return loader == true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // gestureEnabled: false,
        }}
        initialRouteName={
          store.authType === 'true' ? 'SelectionScreen' : 'LngTçranslation'
        }>
        <Stack.Screen name="LngTçranslation" component={LngTranslation} />
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
        <Stack.Screen name="CLogin" component={Login} />
        <Stack.Screen name="CRegister" component={Registration} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CVerifiedEmail" component={VerifiedEmail} />
        <Stack.Screen name="LoginPassword" component={ResetLoginPassword} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="EFirstScreen" component={EFirstScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
}
export default observer(AuthStack);

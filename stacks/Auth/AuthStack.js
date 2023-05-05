import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../../screens/Notification/Notification';
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

const Stack = createStackNavigator();

function AuthStack({navigation}) {
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
        console.log('Error in CHomeStack', error);

        setLoader(false);
      });
  };
  useEffect(() => {
    _getoken('@login');

    return () => {};
  }, []);

  return loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
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
    </React.Fragment>
  );
}
export default observer(AuthStack);

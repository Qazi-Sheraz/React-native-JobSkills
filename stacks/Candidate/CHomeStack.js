import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CBottomTab from '../../screens/Home/CBottomTab';
import CGeneralInformation from '../../screens/Home/ProfileScreen/CGeneralInformation';
import CContactInformation from '../../screens/Home/ProfileScreen/CContactInformation';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import VerifiedEmail from '../../screens/VerifiedEmail/VerifiedEmail';
import SelectedJob from '../../screens/Home/SelectedJob/SelectedJob';
import SelectedCompany from '../../screens/Home/SelectedCompany/SelectedCompany';
import AllJobs from '../../screens/Home/AllJobs/AllJobs';
import FeatureCompany from '../../screens/Home/FeatureCompany/FeatureCompany';
import FeatureJob from '../../screens/Home/FeatureJob/FeatureJob';
import CSearch from '../../screens/Home/Search/CSearch';
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
import CSocialMediaLink from '../../screens/Home/ProfileScreen/CSocialMediaLink';
import ESearch from '../../escreen/Jobs/ESearch';
import Reschedule from '../../escreen/Jobs/Reschedule';
import AuthStack from '../Auth/AuthStack';
import JobDetails from '../../escreen/Jobs/JobDetails';

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
    return () => {};
  }, []);

 

  return(
   loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      {store.token?.token ? 
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
          <Stack.Screen name="CJobDetails" component={JobDetails} />
          <Stack.Screen name="CSelectedCompany" component={SelectedCompany} />
          <Stack.Screen name="CSearch" component={CSearch} />
          <Stack.Screen name="ESearch" component={ESearch} />
          <Stack.Screen name="CFilter" component={CFilter} />
          <Stack.Screen name="CEditProfile" component={EditProfile} />
          <Stack.Screen name="CSocialMediaLink" component={CSocialMediaLink} />
          <Stack.Screen name="Reschedule" component={Reschedule} />
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
      :<AuthStack/>}
    </React.Fragment>
  )
  );
}
export default observer(CHomeStack);

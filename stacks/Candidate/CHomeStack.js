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
import JText from '../../customComponents/JText';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import VerifiedEmail from '../../screens/VerifiedEmail/VerifiedEmail';
import SelectedJob from '../../screens/Home/SelectedJob/SelectedJob';
import SelectedCompany from '../../screens/Home/SelectedCompany/SelectedCompany';
import AllJobs from '../../screens/Home/AllJobs/AllJobs';
import FeatureCompany from '../../screens/Home/FeatureCompany/FeatureCompany';
import FeatureJob from '../../screens/Home/FeatureJob/FeatureJob';
import CSearch from '../../screens/Home/Search/CSearch';
const Stack = createStackNavigator();

function CHomeStack() {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const _getoken = token => {
    AsyncStorage.getItem(token)
      .then(res => {
        store.setToken(res);
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error while getting token',
        });
        setTimeout(() => {
          setLoader(false);
        }, 3000);
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
      {store.token ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="CHome">
          <Stack.Screen name="CHome" component={CBottomTab} />
          <Stack.Screen name="CAllJobs" component={AllJobs} />
          <Stack.Screen name="CFeatureCompany" component={FeatureCompany} />
          <Stack.Screen name="CFeatureJob" component={FeatureJob} />
          <Stack.Screen name="CSelectedJob" component={SelectedJob} />
          <Stack.Screen name="CSelectedCompany" component={SelectedCompany} />
          <Stack.Screen name="CSearch" component={CSearch} />
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
          <Stack.Screen name="CNotification" component={Notification} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SelectionScreen">
          <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
          <Stack.Screen name="CVerifiedEmail" component={VerifiedEmail} />
          <Stack.Screen name="CLogin" component={Login} />
          <Stack.Screen name="CRegister" component={Registration} />
        </Stack.Navigator>
      )}
    </React.Fragment>
  );
}
export default observer(CHomeStack);

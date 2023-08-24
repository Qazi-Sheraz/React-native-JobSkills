import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SelectionScreen from '../../screens/SplashScreen/SelectionScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoScreen from '../../screens/SplashScreen/LogoScreen';
import VerifiedEmail from '../../screens/VerifiedEmail/VerifiedEmail';
import SelectedJob from '../../screens/Home/SelectedJob/SelectedJob';
import SelectedCompany from '../../screens/Home/SelectedCompany/SelectedCompany';
import AllJobs from '../../screens/Home/AllJobs/AllJobs';
import FeatureCompany from '../../screens/Home/FeatureCompany/FeatureCompany';
import FeatureJob from '../../screens/Home/FeatureJob/FeatureJob';
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
import EContactInformation from '../../escreen/Profiles/EContactInformation';
import ECompanyInformation from '../../escreen/Profiles/ECompanyInformation';
import ESocialLink from '../../escreen/Profiles/ESocialLink';
import CSocialMediaLink from '../../screens/Home/ProfileScreen/CSocialMediaLink';
import ViewResume from '../../escreen/Jobs/ViewResume';
import ESearch from '../../escreen/Jobs/ESearch';
import AssessmentView from '../../escreen/edrawer/AssessmentView';
import AuthStack from '../Auth/AuthStack';
import Reschedule from '../../escreen/Jobs/Reschedule';
import JToastr from '../../customComponents/JToastr';

const Stack = createStackNavigator();

function EmployeStack({navigation}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);

  const _getoken = token => {
    AsyncStorage.getItem(token)
      .then(res => {
        // console.log(res);
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


  return loader === true ? (
    <LogoScreen />
  ) : (
    <React.Fragment>
      {store.token?.token?
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName={'EHome'}>
          <Stack.Screen name="EHome" component={EBottomTab} />
          <Stack.Screen name="JToastr" component={JToastr} />
          <Stack.Screen name="Assessments" component={Assessments} />
          <Stack.Screen name="CAllJobs" component={AllJobs} />
          <Stack.Screen name="CFeatureCompany" component={FeatureCompany} />
          <Stack.Screen name="CFeatureJob" component={FeatureJob} />
          <Stack.Screen name="CSelectedJob" component={SelectedJob} />
          <Stack.Screen name="CSelectedCompany" component={SelectedCompany} />
          <Stack.Screen name="ESearch" component={ESearch} />
          <Stack.Screen name="CFilter" component={CFilter} />
          <Stack.Screen name="JobDetails" component={JobDetails} />
          <Stack.Screen name="AddNew_Job" component={AddNew_Job} />
          <Stack.Screen name="JobPreference" component={JobPreference} />
          <Stack.Screen name="JobRequirement" component={JobRequirement} />
          <Stack.Screen name="JobApplication" component={JobApplication} />
          <Stack.Screen name="Reschedule" component={Reschedule} />
          <Stack.Screen
            name="ProfileApplication"
            component={ProfileJobApplication}
          />
          <Stack.Screen name="CEditProfile" component={EditProfile} />
          <Stack.Screen name="Followers" component={Followers} />
          <Stack.Screen name="Applicants" component={Applicants} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Employes" component={Employes} />
          <Stack.Screen name="ViewResume" component={ViewResume} />
          <Stack.Screen name="ESocialLink" component={ESocialLink} />
          <Stack.Screen name="AssessmentView" component={AssessmentView} />
          <Stack.Screen name="CSocialMediaLink" component={CSocialMediaLink} />
          <Stack.Screen
            name="EContactInformation"
            component={EContactInformation}
          />
          <Stack.Screen
            name="ECompanyInformation"
            component={ECompanyInformation}
          />

          {/* AUTHENTICATION */}
          <Stack.Screen name="CNotification" component={Notification} />
          <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
          <Stack.Screen name="CVerifiedEmail" component={VerifiedEmail} />
          <Stack.Screen name="EAccountSetting" component={EAccountSetting} />
          <Stack.Screen name="DFollowings" component={Followings} />
          <Stack.Screen name="DJobAlert" component={JobAlert} />
          <Stack.Screen name="DHelpCenter" component={HelpCenter} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
          <Stack.Screen name="VerifiedPhone" component={VerifiedPhone} />
        </Stack.Navigator>
        :<AuthStack/>}
  
    </React.Fragment>
  );
}
export default observer(EmployeStack);

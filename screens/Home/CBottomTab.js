import {StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favourite from './Favourite';
import AppliedJobs from './AppliedJobs';
import Profile from './Profile';

import CustomCandidateBottomTab from '../../bottomTab/CustomCandidateBottomTab';
import {StoreContext} from '../../mobx/store';

import {
  _country,
  _getAppliedJobData,
  _getFavouriteJobData,
  _getFilterList,
  _getHomeData,
} from '../../functions/Candidate/BottomTab';

import ProfileScreen from './ProfileScreen';
import {_getFollowingCompanyData} from '../../functions/Candidate/DFollowing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../config/url';
export default function CBottomTab() {
  const Tab = createBottomTabNavigator();
  const store = useContext(StoreContext);
  const _getlangApi = ()=>{
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${url.baseUrl}/get-language`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        handleSave(result)
      })
      .catch(error => console.log('error', error));
  };
  const handleSave = async lang => {
    // Switch to the selected language
   
       try {
         await AsyncStorage.setItem('selectedLanguage', lang);
         store.setLang(lang);
        
         console.log('lang',lang)
       } catch (error) {
         console.log('Error storing language:', error);
       }
     };
  useEffect(() => {
    _getlangApi();
    _getFavouriteJobData(store);
    _getHomeData(store);
    _getAppliedJobData(store);
    _getFollowingCompanyData(store);
   

    return () => {
     
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={({state, descriptors, navigation}) => (
        <CustomCandidateBottomTab
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />

      )}>
        
      <Tab.Screen options={{tabBarLabel:store.lang.home}} name="Home" component={Home} />
      <Tab.Screen options={{tabBarLabel:store.lang.favourite}} name="Favourite" component={Favourite} />
      <Tab.Screen options={{tabBarLabel:store.lang.applied_job}} name="Applied Jobs" component={AppliedJobs} />
      <Tab.Screen options={{tabBarLabel:store.lang.profile}} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

import {StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomCandidateBottomTab from '../../bottomTab/CustomCandidateBottomTab';
import {StoreContext} from '../../mobx/store';
import Home from './Home';
import Meeting from './Meeting';
import Job from './Job';
import Profile from './Profile';
import CustomEmployeeBottomTab from '../../bottomTab/CustomEmployeeBottomTab';
import { observer } from 'mobx-react';
import { _addnewJob, _dashboard, } from '../../functions/Candidate/BottomTab';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

 function EBottomTab() {
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
    _dashboard(store);
    _addnewJob(store);
    
    return () => {
   
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      tabBar={({state, descriptors, navigation}) => (
        <CustomEmployeeBottomTab
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      )}>
      <Tab.Screen options={{
        tabBarLabel:store.lang.home
      }} name="Home" component={Home} /> 
      <Tab.Screen options={{
        tabBarLabel:store.lang.meeting
      }} name="Meeting" component={Meeting} />
      <Tab.Screen options={{
        tabBarLabel:store.lang.job
      }} name="Job" component={Job} />
      <Tab.Screen options={{
        tabBarLabel:store.lang.profile
      }} name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
export default observer(EBottomTab)
const styles = StyleSheet.create({});

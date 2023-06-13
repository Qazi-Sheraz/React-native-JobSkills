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
import url from '../../config/url';
import { _addnewJob, _dashboard, _viewResum } from '../../functions/Candidate/BottomTab';

 function EBottomTab() {
  const Tab = createBottomTabNavigator();
  const store = useContext(StoreContext);

  useEffect(() => {
    _dashboard(store);
    _addnewJob(store);
    // _viewResum(store);
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

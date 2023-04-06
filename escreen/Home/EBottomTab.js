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

 function EBottomTab() {
  const Tab = createBottomTabNavigator();
  const store = useContext(StoreContext);

  useEffect(() => {
    return () => {
      // getFavouriteJobList();
      // _getData();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Job"
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

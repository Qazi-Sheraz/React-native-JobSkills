import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favourite from './Favourite';
import AppliedJobs from './AppliedJobs';
import Profile from './Profile';

import CustomCandidateBottomTab from '../../bottomTab/CustomCandidateBottomTab';
export default function CBottomTab() {
  const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="AppliedJobs" component={AppliedJobs} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
